import React, { useEffect, useRef, useState } from 'react'
// style
import '../styles/scss/reset.scss';
import '../styles/reception.scss';
// components
import EmpBar from '../components/employee/EmpBar';
import PatientDetail from '../components/patient/PatientDetail';
import PatientStatus from '../components/patient/PatientStatus';
import Waiting4Payment from '../components/patient/Waiting4Payment';
import Receipt from '../components/patient/Receipt';
import MedicalHistory from '../components/patient/MedicalHistory';
import Modal from '../components/modalReception/Modal';
import PatientRegistrationModal from '../components/modalReception/PatientRegistrationModal';
import axios from 'axios';

const Reception = (props) => {
  const [registration, setRegistration] = useState(false);
  const [data, setdata] = useState();
  const name = useRef("");
  const frontSsn = useRef("");
  const backSsn = useRef("");
  const [patientId, setPatientId] = useState();
  const [empId, setEmpId] = useState();
  const [symptom, setSymptom] = useState();
  const [specialityName, setSpecialityName] = useState('내과');
  const empIdTemp = empId!==null && empId!==undefined?empId.substring(4,11):' ';
  const [waitingReceipt, setWaitingReceipt] = useState([]);
  const [acceptance, setAcceptance] = useState([{}]);
  const [outStatusReRender, setOutStatusReRender] = useState(true);
  const [wait4payReRender, setWait4payReRender] = useState(true);

  useEffect(()=>{
    axios.get("http://localhost:9090/outStatus/getwaiting4receipt")
         .then((res) => setWaitingReceipt(res.data));
  },[]);

  

  function patientInfo() {
    if(window.event.keyCode === 13){
      axios.post("http://localhost:9090/patient/regInfo", {
      PATIENT_NAME: name.current,
      PATIENT_SSN: frontSsn.current+"-"+backSsn.current
      }).then((res)=>{
        if(res.data.length === 0 || res.data === null) {
          alert("없는 사람임")
        } else {
          setdata(res.data);
          setPatientId(res.data.PATIENT_ID_PK);
        }
      });
    }
  }

  function receipt() {
      axios.post("http://localhost:9090/outStatus/receipt", {
      EMP_ID_PK: empIdTemp,
      SPECIALITY: specialityName,
      SYMPTOM: symptom!==null && symptom!==undefined? symptom : alert('증상 입력하세요.'),
      PATIENT_ID_PK: patientId
      }).then(() => {
        if(symptom!==null && symptom!==undefined) {
          alert("접수 완료")
        }
        setOutStatusReRender(()=>false);
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
                        name.current = e.target.value;
                      }}/>
                <label>주민등록번호</label>
                <input type='number' onChange={(e) => {
                        frontSsn.current = e.target.value;
                      }}/> - 
                <input type='number' onChange={(e) => {
                        backSsn.current = e.target.value;
                      }}
                      onKeyPress={patientInfo}/>
              </form>
            </div>
            <div className='btns'>
              <input type="button" value="등록" className='regbtn' onClick={() => setRegistration(!registration)}/>
              {registration && (
                <Modal closeModal={() => setRegistration(!registration)}>
                  <PatientRegistrationModal/>
                </Modal>
              )}
              <button className='regbtn' onClick={receipt}>접수</button>
            </div>
          </div>
          <PatientDetail data={data} setEmpId={setEmpId} symptom={symptom} setSymptom={setSymptom} setSpecialityName={setSpecialityName}/>
          <MedicalHistory data={data}/>
        </div>
        <PatientStatus className='bottom1' outStatusReRender={outStatusReRender} setOutStatusReRender={setOutStatusReRender}/>
        <Waiting4Payment waitingReceipt={waitingReceipt} setAcceptance={setAcceptance} wait4payReRender={wait4payReRender} setWait4payReRender={setWait4payReRender}/>
        <Receipt acceptance={acceptance} setOutStatusReRender={setOutStatusReRender} setWait4payReRender={setWait4payReRender}/>
      </main>
    </div>
  )
}

export default Reception;
