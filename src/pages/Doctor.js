import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios';
import Calendar from 'react-calendar';
// style
import '../styles/scss/reset.scss';
import '../styles/doctor.scss';
import '../styles/Calendar.css';
import '../components/doctor/pastTreatmentModal.scss';
// components
import EmpBar from '../components/employee/EmpBar';
import ReducedPatientStatus from '../components/patient/ReducedPatientStatus';
import Modal from '../components/doctor/pastTreatmentModal';
import PatientDetailModal from '../components/doctor/PatientDetailModal';

const Doctor = () => {
  const [treatmentPatientInfo, setTreatmentPatientInfo] = useState([{}]);
  const [pastTreatmentList, setPastTreatmentList] = useState([{}]);
  const [pastTreatmentDetail, setPastTreatmentDetail] = useState([{}]);
  const [inPatientList, setInPatientList] = useState([{}]);
  const [value, onChange] = useState(new Date());
  const [visibleTreatmentDiv, setVisibleTreatmentDiv] = useState(false);
  const [visibleMedicineDiv, setVisibleMedicineDiv] = useState(false);
  const [visibleAdmissionDiv, setVisibleAdmissionDiv] = useState(false);
  const [detail, setDetail] = useState(false);
  const diagnosis = useRef("");
  const treatmentMemo = useRef("");
  const treatmentOrder = useRef("");
  const medicineOrder = useRef("");
  const admissionOrder = useRef("");
  const admissionCheck = useRef(0);

  useEffect(() => {

    axios.get("http://localhost:9090/patient/treatmentPatientInfo")
      .then((res) => {
        console.log(res.data);
        setTreatmentPatientInfo(res.data);
      }); 

    axios.get("http://localhost:9090/patient/pastTreatmentList")
      .then((res) => {
        setPastTreatmentList(res.data)
      });

    axios.get("http://localhost:9090/patient/pastTreatmentDetail")
      .then((res) => {
        console.log(res.data);
        setPastTreatmentDetail(res.data)
      });

    axios.get("http://localhost:9090/AdmissionFront/myInPatient")
      .then((res) => {
        console.log(res.data)
        setInPatientList(res.data)
    });

  }, []);

  const sendMedicalCharts = () => {

    const data = {
      diagnosis: diagnosis.current,
      treatmentMemo: treatmentMemo.current,
      treatmentOrder: treatmentOrder.current,
      medicineOrder: medicineOrder.current,
      admissionOrder: admissionOrder.current,
      admissionCheck: admissionCheck.current,
      treatmentNumPk: treatmentPatientInfo[0].TREATMENT_NUM_PK
    }

    axios.post("http://localhost:9090/treatmentOrder/treatmentDone", JSON.stringify(data),
    {
      headers: {
        "Content-Type" : `application/json`,
      },
    })
    .then((res)=>{
      alert(res.data);
      window.location.reload();
    })
  }

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
            <div className='dropdown-submenu'>
              <div className='dropdown-box'>
                <table className='dropdown-table'>
                  <thead>
                    <tr>
                      <th>진료 일자</th>
                      <th>진단명</th>
                      <th>처방 및 치료 내역</th>
                    </tr>
                  </thead>
                  {pastTreatmentList.map((data, index)=> (
                    <tbody key={index}>
                      <tr>
                        <td>{data.TREATMENT_DATE || ''}</td>
                        <td>{data.DIAGNOSTIC_NAME || ''}</td>
                        <td><button onClick={() => setDetail(!detail)}>상세기록</button></td>
                      </tr>
                    </tbody>
                  ))}
                </table>
              </div>
            </div>
          </div>
          {detail && (
            <Modal closeModal={() => setDetail(!detail)}>
              <PatientDetailModal pastTreatmentDetail={pastTreatmentDetail} />
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
            <Calendar onChange={onChange} value={value}
            formatDay={(locale, value) => 
              value.toLocaleDateString("en", {day: "numeric"})
            }
            />
          </div>
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
              <tbody key={index}>
                <tr>
                  <td className='admissionTd'>{data.PATIENT_ID_FK || ''}</td>
                  <td className='admissionTd'>{data.PATIENT_NAME || ''}</td>
                  <td className='admissionTd'>{data.GENDER || ''}/{data.PATIENT_AGE || ''}</td>
                  <td className='admissionTd'>{data.ADMISSION_DATE || ''}</td>
                  <td className='admissionTd'>{data.EMP_NAME || ''}</td>
                  <td className='admissionTd'>{data.ROOM_NUM || ''}</td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
        <div className='treatment-box'>
          <span className='box-title'>진료 기록</span>
          <div className='line' />

            <form className='treatment-form'>

              <div className='divide1'>

                <div className='diagnosis-div'>
                  <span className='diagnosis-title'>병 &nbsp;&nbsp;&nbsp; 명 : </span>
                  <input 
                      className='diagnosis-input' 
                      placeholder='병명을 입력해주세요.' 
                      onChange={(e) => {
                        diagnosis.current = e.target.value;
                      }} />
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
                      onClick={() => {
                        setVisibleMedicineDiv(!visibleMedicineDiv);
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
                    <textarea 
                      onChange={(e) => {
                        medicineOrder.current = e.target.value;
                      }}
                    />
                  </div>}
                  
                  {visibleAdmissionDiv && <div className='admission-detail'>
                    <span>입원 오더</span> <br /> 
                    <textarea 
                      onChange={(e) => {
                        admissionOrder.current = e.target.value;
                      }}
                    />
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
        <ReducedPatientStatus />
      </main>
    </div>

  )
}

export default Doctor
