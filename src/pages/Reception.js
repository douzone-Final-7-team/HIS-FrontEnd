import React, { useRef, useState } from 'react'
// style
import '../styles/scss/reset.scss';
import '../styles/reception.scss';
// components
import EmpBar from '../components/employee/EmpBar';
import PatientDetail from '../components/patient/PatientDetail';
import PatientStatus from '../components/patient/PatientStatus';
// import Waiting4Payment from '../components/patient/Waiting4Payment';
import Receipt from '../components/patient/Receipt';
import MedicalHistory from '../components/patient/MedicalHistory';
import Modal from '../components/modalReception/Modal';
import PatientRegistrationModal from '../components/modalReception/PatientRegistrationModal';
import axios from 'axios';

const Reception = (props) => {
  const [registration, setRegistration] = useState(false);
  const [data, setdata] = useState();
  const [name, setName] = useState();
  const [frontSsn, setFrontSsn] = useState();
  const [backSsn, setBackSsn] = useState();
  const [patientId, setPatientId] = useState();
  const [empId, setEmpId] = useState();
  const [symptom, setSymptom] = useState();
  const [specialityName, setSpecialityName] = useState('내과');

  const empIdTemp = empId!=null && empId!=undefined?empId.substring(4,11):' ';

  function patientInfo() {
    if(window.event.keyCode == 13){
      axios.post("http://43.200.169.159:9090/patient/regInfo", {
      PATIENT_NAME: name,
      PATIENT_SSN: frontSsn+"-"+backSsn
      }).then((res)=>{
        if(res.data.length == 0 || res.data == null) {
          alert("없는 사람임")
        } else {
          setdata(res.data);
          setPatientId(res.data.PATIENT_ID_PK);
        }

//       });
//     }
//   }

  function receipt() {
      axios.post("http://43.200.169.159:9090/outStatus/receipt", {
      EMP_ID_PK: empIdTemp,
      SPECIALITY: specialityName,
      SYMPTOM: symptom!=null && symptom!=undefined? symptom : alert('증상 입력하세요.'),
      PATIENT_ID_PK: patientId
      }).then(() => {
        if(symptom!=null && symptom!=undefined) {
          alert("접수 완료")
        }
        window.location.href="http://localhost:3000/reception";
      });
  }

  return (
    <div className='reception'>
      <main className='main'>
        <div className='top'>
          <EmpBar/>
        </div>
        <div className='middle'>
          <div className='search-info'>
            <div className='input-patient'>
              <form action=''>
                <label>이름</label>
                <input onChange={(e) => {
                        setName(e.target.value);
                      }}/>
                <label>주민등록번호</label>
                <input type='number' onChange={(e) => {
                        setFrontSsn(e.target.value);
                      }}/> - 
                <input type='number' onChange={(e) => {
                        setBackSsn(e.target.value);
                      }}
                      onKeyPress={patientInfo}/>
              </form>
            </div>
            <div className='btns'>
              <input type="button" value="등록" className='regbtn' onClick={() => setRegistration(!registration)}/>
              {/* {registration && (
                <Modal closeModal={() => setRegistration(!registration)}>
                  <PatientRegistrationModal/>
                </Modal>
              )} */}
              <a href='#' className='btn '>접수</a>
            </div>
          </div>
          <PatientDetail data={data} setEmpId={setEmpId} symptom={symptom} setSymptom={setSymptom} setSpecialityName={setSpecialityName}/>
          <MedicalHistory data={data}/>
        </div>
        <PatientStatus className='bottom1'/>
        <Waiting4Payment/>
        <Receipt/>
      </main>
    </div>
  )
}

export default Reception;


