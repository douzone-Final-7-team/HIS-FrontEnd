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
import { alertSweetError, alertSweetSuccess } from '../components/higher-order-function/Alert.js';

const socket = io.connect('http://43.200.169.159:3001');

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
  const admissionOrder = useRef(startDate.toJSON().substring(0, 10));
  const admissionCheck = useRef(0);
  const specialityId = 'N';//localStorage.getItem('specialityId') || '';
  const token = localStorage.getItem('jwt') || '';

  useEffect(() => {

    axios.get("http://43.200.169.159:9090/patient/pastTreatmentList", {params : {patientPk: treatmentPatientInfo[0].PATIENT_ID_PK || ''}})
      .then((res) => {
        pastTreatmentList.current = res.data
      });

    axios.get("http://43.200.169.159:9090/AdmissionFront/myInPatient", {
      headers : {'Authorization': token}
    })
      .then((res) => {
        setInPatientList(res.data)
    });

    axios.get("http://43.200.169.159:9090/treatmentOrder/getDiagnosisList", {
      headers : {'Authorization': token,}
    })
    .then((res) => {
      setDiagnosisList(res.data)
    })

  }, [token, treatmentPatientInfo]);

    /*-??????-*/
    const [room, setRoom] = useState("");

    useEffect(()=>{
      setRoom("out")
  
      if (room !== "") {
        // ??????????????? ???????????? ????????? ?????? join_room id??? ????????? ?????? ??????
        // 2?????? ????????? room??? ??????????????? ????????? data??????????????? ?????????
        socket.emit("join_room", room);
    }
    },[room])

  const getMedicineList = () => {
    axios.get("http://43.200.169.159:9090/treatmentOrder/getMedicineList", {params :{diagnosis: diagnosis.current}})
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
      alertSweetError('?????? ?????? ??????', '????????? ??????????????????.')
    }else if(treatmentPatientInfo[0].OUTPATIENT_STATUS_CODE !== 'OA') {
      alertSweetError('?????? ?????? ??????', '?????? ????????? ????????????.')
    }else{

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

      axios.post("http://43.200.169.159:9090/treatmentOrder/treatmentDone", JSON.stringify(data),
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
      //emit??? ?????????
        alertSweetSuccess(res.data, `${treatmentPatientInfo[0].PATIENT_NAME}?????? ????????? ?????????????????????.`, Done)
        function Done() {
          window.location.reload()
        } 
      })
    }
  };
  
  return (
    <div className='doctor'>
      <main className='main'>
        <div className='top'>
          <EmpBar />
        </div>
        <div className='infoBox'>
          <span className='infoName'>?????? : </span><input className='nameInput' readOnly value={treatmentPatientInfo[0].PATIENT_NAME || ''}/>
          <span className='infoSsn'>?????????????????? : </span><input className='ssnInput' readOnly value={treatmentPatientInfo[0].PATIENT_SSN || ''}/>
          <div className='dropdown'>
            <a href='#!'className='btn'>????????????</a>
            <div className='dropdown-submenu' style={detailModal === true ? {display: 'none'} : {}}>
              <div className='dropdown-box'>
                <table className='dropdown-table'>
                  <thead>
                    <tr>
                      <th>?????? ??????</th>
                      <th>?????????</th>
                      <th>?????? ??? ?????? ??????</th>
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
                            >????????????</button></td>
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
                <th className='devide1'>?????????</th>
                <td><input readOnly value={treatmentPatientInfo[0].SPECIALITY || ''}/></td>
                <th className='devide1'>????????????</th>
                <td><input readOnly value={treatmentPatientInfo[0].INSURANCE_CHECK || ''}/></td>
                <th className='devide1'>????????????</th>
                <td><input readOnly value={treatmentPatientInfo[0].VISITCOUNT || ''}/></td>
              </tr>
            </tbody>
            <tbody>
              <tr>
                <th colSpan={2}>??????</th>
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
          <span className='admissionTitle'>?????? ??????</span>
          <div className='line'></div>
          <table className='admissionTb'>
            <thead>
              <tr>
                <th className='admissionTh'>????????????</th>
                <th className='admissionTh'>????????????</th>
                <th className='admissionTh'>S/A</th>
                <th className='admissionTh'>????????????</th>
                <th className='admissionTh'>?????? ??????</th>
                <th className='admissionTh'>??????</th>
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
                  <td className='admissionTd'>{data.WARD || ''}?????? / {data.ROOM_NUM || ''}??????</td>
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
          <span className='box-title'>?????? ??????</span>
          <div className='line' />

            <form className='treatment-form'>

              <div className='divide1'>

                <div className='diagnosis-div'>
                  <span className='diagnosis-title'>??? &nbsp;&nbsp;&nbsp; ??? : </span>
                  <select 
                    className='diagnosis-select' 
                    name="diagnosis" 
                    onChange={(e) => {
                      diagnosis.current = e.target.value
                      getMedicineList()
                    }}>
                    <option name="diagnosisOption" value={""}>?????? ??????</option>
                    {diagnosisList.map((data, index) => (
                      <option key={index} value={data.DIAGNOSIS_CODE}>{data.DIAGNOSIS}</option>
                    ))}
                  </select>
                      <br />
                  <div className='order-div'>
                    <span>??? &nbsp;&nbsp;&nbsp; ??? : </span>
                    <input 
                      className='treatment-checkbox' 
                      type="checkbox" 
                      onClick={() => {
                        setVisibleTreatmentDiv(!visibleTreatmentDiv);
                      }}
                    /> <span>??????</span> 

                    <input 
                      className='medicine-checkbox' 
                      type="checkbox" 
                      name='medicineCheckbox'
                      onClick={() => {
                          setVisibleMedicineDiv(!visibleMedicineDiv);
                      }}
                    /> <span>???</span>

                    <input 
                      className='admission-checkbox' 
                      type="checkbox" 
                      onChange={() => {
                        admissionCheck.current = 1;
                      }}
                      onClick={() => {
                        setVisibleAdmissionDiv(!visibleAdmissionDiv);
                      }}
                      /> <span>?????? ??????</span>
                  </div>
                </div>

                <div className='order-detail'>
                  {visibleTreatmentDiv && <div className='treatment-detail'>
                    <span>?????? ??????</span> <br /> 
                    <textarea 
                      onChange={(e) => {
                        treatmentOrder.current = e.target.value;
                      }}
                    />
                  </div>}

                  {visibleMedicineDiv && <div className='medicine-detail'>
                    <span>??? ??????</span> <br /> 
                    <div className='medicine-div'>
                      <table className='medicine-table'>
                          {medicineList.map((data, index) => (
                            <tbody key={index}>
                              <tr>
                                <th>{data.MEDICINE || '????????? ???????????? ????????????'}</th>
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
                    <span>?????? ??????</span> <br /> 
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

                  <span className='form-span'>?????? ??????</span> <br /><br /> 
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
                  }}>??????</a>

              </div>

            </form>
        </div>
        <ReducedPatientStatus setTreatmentPatientInfo={setTreatmentPatientInfo}/>
      </main>
    </div>

  )
}

export default Doctor
