import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios';
import Calendar from 'react-calendar';
import io from 'socket.io-client';
import DatePicker from 'react-datepicker';
import { ko } from 'date-fns/esm/locale';
import moment from 'moment';
// style
import '../styles/scss/reset.scss';
import '../styles/doctor.scss';
import '../styles/Calendar.css';
import '../components/doctor/PatientDetail.scss';
import '../components/doctor/DoctorSchedule.scss';
import '../components/doctor/InPatientModal.scss';
// components
import EmpBar from '../components/employee/EmpBar';
import ReducedPatientStatus from '../components/patient/ReducedPatientStatus';
import Modal from '../components/doctor/Modal';
import PatientDetailModal from '../components/doctor/PatientDetailModal';
import DoctorScheduleModal from '../components/doctor/DoctorScheduleModal';
import InPatientModal from '../components/doctor/InPatientModal';
import InPatientDetailModal from '../components/doctor/InPatientDetailModal';

const socket = io.connect('http://192.168.0.195:3001');

const Doctor = () => {
  const [treatmentPatientInfo, setTreatmentPatientInfo] = useState([{}]);
  const pastTreatmentList = useRef([{}]);
  const treatmentDate = useRef("");
  const [inPatientList, setInPatientList] = useState([{}]);
  const [value, onChange] = useState(new Date());
  const [startDate, setStartDate] = useState(new Date());
  const [visibleTreatmentDiv, setVisibleTreatmentDiv] = useState(false);
  const [visibleMedicineDiv, setVisibleMedicineDiv] = useState(false);
  const [visibleAdmissionDiv, setVisibleAdmissionDiv] = useState(false);
  const [detailModal, setDetailModal] = useState(false);
  const [scheduleModal, setScheduleModal] = useState(false);
  const [inPatientModal, setInPatientModal] = useState(false);
  const [outInfoElements, setOutInfoElements] = useState([{}]);
  const [medicineOrder, setMedicineOrder] = useState([]);
  const [diagnosisList, setDiagnosisList] = useState([{}]);
  const [medicineList, setMedicineList] = useState([{}]);
  const modalDate = useRef("");
  const diagnosis = useRef("");
  const treatmentMemo = useRef("");
  const treatmentOrder = useRef("");
  const admissionOrder = useRef("");
  const admissionCheck = useRef(0);
  const specialityId = 'N';//localStorage.getItem('specialityId') || '';
  const token = localStorage.getItem('jwt') || '';

  useEffect(() => {

    axios.get("http://192.168.0.195:9090/patient/pastTreatmentList", {params : {patientPk: treatmentPatientInfo[0].PATIENT_ID_PK || ''}})
      .then((res) => {
        pastTreatmentList.current = res.data
      });

    axios.get("http://192.168.0.195:9090/AdmissionFront/myInPatient", {
      headers : {'Authorization': token}
    })
      .then((res) => {
        setInPatientList(res.data)
    });

    axios.get("http://192.168.0.195:9090/treatmentOrder/getDiagnosisList", {
      headers : {'Authorization': token,}
    })
    .then((res) => {
      setDiagnosisList(res.data)
    })

  }, [token, treatmentPatientInfo]);

    /*-소켓-*/
    const [room, setRoom] = useState("");

    useEffect(()=>{
      setRoom("out")
  
      if (room !== "") {
        // 프론트에서 백엔드로 데이터 방출 join_room id로 백에서 탐지 가능
        // 2번째 인자인 room은 방이름이며 백에선 data매게변수로 받는다
        socket.emit("join_room", room);
    }
    },[room])

  const getMedicineList = () => {
    axios.get("http://192.168.0.195:9090/treatmentOrder/getMedicineList", {params :{diagnosis: diagnosis.current}})
      .then((res) => {
        setMedicineList(res.data)
      })
  };

  const onCheckedElement = (checked, item) => {
    if (checked) {
      setMedicineOrder([...medicineOrder, item]);
    } else if (!checked) {
      setMedicineOrder(medicineOrder.filter(el => el !== item));
    }
  };


  const sendMedicalCharts = () => {

    if(diagnosis.current === '') {
      alert("병명을 선택해주세요.");
    } else{

      const data = {
        diagnosis: diagnosis.current,
        treatmentMemo: treatmentMemo.current,
        treatmentOrder: treatmentOrder.current,
        admissionOrder: admissionOrder.current,
        admissionCheck: admissionCheck.current,
        medicineOrder: medicineOrder,
        receivePk: treatmentPatientInfo[0].RECEIVE_ID_PK,
        treatmentPk: treatmentPatientInfo[0].TREATMENT_NUM_PK
      }

      axios.post("http://192.168.0.195:9090/treatmentOrder/treatmentDone", JSON.stringify(data),
      {
        headers: {
          "Content-Type" : `application/json`,
        },
      })
      .then((res)=>{
        socket.emit("doctor_complete" , {outpatient : room,
                                      RECEIVE_ID_PK : data.receivePk,
                                      SPECIALITY_ID_FK : specialityId
                                      });
      //emit을 보내고
        alert(res.data);
        window.location.reload();
      })
    }
  };

  // console.log(admissionOrder.current);
  
  return (
    <div className='doctor'>
      <main className='main'>
        <div className='top'>
          <EmpBar />
        </div>
        <div className='infoBox'>
          <span className='infoName'>이름 : </span><input className='nameInput' readOnly value={treatmentPatientInfo[0].PATIENT_NAME || ''}/>
          <span className='infoSsn'>주민등록번호 : </span><input className='ssnInput' readOnly value={treatmentPatientInfo[0].PATIENT_SSN || ''}/>
          <div className='dropdown'>
            <a href='#!'className='btn'>과거병력</a>
            <div className='dropdown-submenu' style={detailModal === true ? {display: 'none'} : {}}>
              <div className='dropdown-box'>
                <table className='dropdown-table'>
                  <thead>
                    <tr>
                      <th>진료 일자</th>
                      <th>진단명</th>
                      <th>처방 및 치료 내역</th>
                    </tr>
                  </thead>
                  {pastTreatmentList.current.map((data, index)=> (
                    <tbody key={index}>
                      <tr>
                        <td>{data.TREATMENT_DATE || ''}</td>
                        <td>{data.DIAGNOSIS || ''}</td>
                        <td><button 
                              onClick={() => {
                                treatmentDate.current = data.TREATMENT_DATE
                                setDetailModal(!detailModal)
                              }}
                            >상세기록</button></td>
                      </tr>
                    </tbody>
                  ))}
                </table>
              </div>
            </div>
          </div>
          {detailModal && (
            <Modal closeModal={() => setDetailModal(!detailModal)}>
              <PatientDetailModal 
                patientID = {treatmentPatientInfo[0].PATIENT_ID_PK}
                treatmentDate = {treatmentDate.current}
              />
            </Modal>
          )}
          <table className='infoTable'>
            <tbody>
              <tr>
                <th className='devide1'>S/A</th>
                <td className='devide1'>{treatmentPatientInfo[0].PATIENT_AGE || ''}/{treatmentPatientInfo[0].GENDER || ''}</td>
                <th className='devide1'>TEL</th>
                <td><input readOnly value={treatmentPatientInfo[0].PATIENT_TEL || ''}/></td>
                <th className='devide1'>진료과</th>
                <td><input readOnly value={treatmentPatientInfo[0].SPECIALITY || ''}/></td>
                <th className='devide1'>보험유무</th>
                <td><input readOnly value={treatmentPatientInfo[0].INSURANCE_CHECK || ''}/></td>
                <th className='devide1'>진료구분</th>
                <td><input readOnly value={treatmentPatientInfo[0].VISITCOUNT || ''}/></td>
              </tr>
            </tbody>
            <tbody>
              <tr>
                <th colSpan={2}>증상</th>
                <td colSpan={10}><input readOnly value={treatmentPatientInfo[0].SYMPTOM || ''} /></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className='item2'>
          <div>
            <Calendar 
              onChange={onChange} 
              value={value}
              formatDay={(locale, value) => 
                value.toLocaleDateString("en", {day: "numeric"})
              }
              onClickDay={(value) => {
                modalDate.current = moment(value).format('YYYY-MM-DD')
                setScheduleModal(!scheduleModal)
              }}
            />
          </div>
          {scheduleModal && (
            <Modal closeModal={() => setScheduleModal(!scheduleModal)}>
              <DoctorScheduleModal modalDate={modalDate.current} />
            </Modal>
          )}
        </div>
        <div className='admissionBox'>
          <span className='admissionTitle'>입원 내역</span>
          <div className='line'></div>
          <table className='admissionTb'>
            <thead>
              <tr>
                <th className='admissionTh'>환자번호</th>
                <th className='admissionTh'>환자이름</th>
                <th className='admissionTh'>S/A</th>
                <th className='admissionTh'>입실일자</th>
                <th className='admissionTh'>담당 의사</th>
                <th className='admissionTh'>병실</th>
              </tr>
            </thead>
            {inPatientList.map((data, index) => (
              <tbody 
                key={index} 
                className='admission-tbody' 
                onClick={() => {
                  setInPatientModal(!inPatientModal)
                  setOutInfoElements([
                    data.PATIENT_NAME, 
                    data.WARD, 
                    data.ROOM_NUM, 
                    data.BED_NUM
                  ])
                }}>
                <tr>
                  <td className='admissionTd'>{data.PATIENT_ID_FK || ''}</td>
                  <td className='admissionTd'>{data.PATIENT_NAME || ''}</td>
                  <td className='admissionTd'>{data.GENDER || ''}/{data.PATIENT_AGE || ''}</td>
                  <td className='admissionTd'>{data.ADMISSION_DATE || ''}</td>
                  <td className='admissionTd'>{data.EMP_NAME || ''}</td>
                  <td className='admissionTd'>{data.WARD || ''}병동 / {data.ROOM_NUM || ''}호실</td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>

        {inPatientModal && (
            <InPatientModal closeModal={() => setInPatientModal(!inPatientModal)}>
              <InPatientDetailModal outInfoElements={outInfoElements} />
            </InPatientModal>
        )}

        <div className='treatment-box'>
          <span className='box-title'>진료 기록</span>
          <div className='line' />

            <form className='treatment-form'>

              <div className='divide1'>

                <div className='diagnosis-div'>
                  <span className='diagnosis-title'>병 &nbsp;&nbsp;&nbsp; 명 : </span>
                  <select 
                    className='diagnosis-select' 
                    name="diagnosis" 
                    onChange={(e) => {
                      diagnosis.current = e.target.value
                      getMedicineList()
                    }}>
                    <option name="diagnosisOption" value={""}>병명 선택</option>
                    {diagnosisList.map((data, index) => (
                      <option key={index} value={data.DIAGNOSIS_CODE}>{data.DIAGNOSIS}</option>
                    ))}
                  </select>
                      <br />
                  <div className='order-div'>
                    <span>오 &nbsp;&nbsp;&nbsp; 더 : </span>
                    <input 
                      className='treatment-checkbox' 
                      type="checkbox" 
                      onClick={() => {
                        setVisibleTreatmentDiv(!visibleTreatmentDiv);
                      }}
                    /> <span>치료</span> 

                    <input 
                      className='medicine-checkbox' 
                      type="checkbox" 
                      name='medicineCheckbox'
                      onClick={() => {
                        if(diagnosis.current === '') {
                          alert('병명을 선택해주세요.')
                        } else {
                          setVisibleMedicineDiv(!visibleMedicineDiv);
                        }
                      }}
                    /> <span>약</span>

                    <input 
                      className='admission-checkbox' 
                      type="checkbox" 
                      onChange={() => {
                        admissionCheck.current = 1;
                      }}
                      onClick={() => {
                        setVisibleAdmissionDiv(!visibleAdmissionDiv);
                      }}
                      /> <span>입원 여부</span>
                  </div>
                </div>

                <div className='order-detail'>
                  {visibleTreatmentDiv && <div className='treatment-detail'>
                    <span>치료 오더</span> <br /> 
                    <textarea 
                      onChange={(e) => {
                        treatmentOrder.current = e.target.value;
                      }}
                    />
                  </div>}

                  {visibleMedicineDiv && <div className='medicine-detail'>
                    <span>약 처방</span> <br /> 
                    <div className='medicine-div'>
                      <table className='medicine-table'>
                          {medicineList.map((data, index) => (
                            <tbody key={index}>
                              <tr>
                                <th>{data.MEDICINE}</th>
                                <td>
                                  <input type={"checkbox"} value={data.MEDICINE || ''} onChange={(e) => onCheckedElement(e.target.checked, e.target.value)} />
                                </td>
                              </tr>
                            </tbody>
                          ))}
                      </table>
                    </div>
                  </div>}
                  
                  {visibleAdmissionDiv && <div className='admission-detail'>
                    <span>입원 날짜</span> <br /> 
                    <DatePicker 
                      className='datepicker'
                      dateFormat={'yyyy-MM-dd'} 
                      selected={startDate} 
                      locale={ko}
                      onChange={(date) => {
                        admissionOrder.current = date.toJSON().substring(0, 10)
                        setStartDate(date)
                      }} 
                    />
                    {/* <textarea 
                      onChange={(e) => {
                        admissionOrder.current = e.target.value;
                      }}
                    /> */}
                  </div>}
                </div>

              </div>

              <div className='divide2'>

                <div className='memo-div'>

                  <span className='form-span'>진료 메모</span> <br /><br /> 
                    <textarea 
                      onChange={(e) => {
                      treatmentMemo.current = e.target.value;
                      }}
                    />

                </div>

                <a 
                  href='#!' 
                  className='btn' 
                  onClick={() => {
                    sendMedicalCharts();
                  }}>완료</a>

              </div>

            </form>
        </div>
        <ReducedPatientStatus setTreatmentPatientInfo={setTreatmentPatientInfo}/>
      </main>
    </div>

  )
}

export default Doctor
