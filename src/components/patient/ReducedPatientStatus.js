import axios from 'axios';
import React, { useEffect, useState} from 'react'
// style
import './reducedPatientStatus.scss';
import io from 'socket.io-client';

const socket = io.connect('http://localhost:3001');

const ReducedPatientStatus = ({ setTreatmentPatientInfo }) => {

  const [myPatientList,setMyPatientList] = useState([]);
  const [myPatientNum, setMyPatientNum] = useState({});
  const doctorID = localStorage.getItem('empIdPk') || '';
  const [room, setRoom] = useState("");

  useEffect(()=>{
    setRoom("out")

    if (room !== "") {
      // 프론트에서 백엔드로 데이터 방출 join_room id로 백에서 탐지 가능
      // 2번째 인자인 room은 방이름이며 백에선 data매게변수로 받는다
      socket.emit("join_room", room);
  }
  },[room])

  //여기서 on을 받는다.
  useEffect(()=> {
    setTimeout(() => 
      socket.on("change_state", ()=>{//receipt_render
        axios.get("http://localhost:9090/outStatus/MyPatient", {params : {doctorID : doctorID}})
        .then(res=> setMyPatientList(res.data))}),100)
  },[doctorID])

  useEffect(()=> {
    setTimeout(() => 
      socket.on("receipt_render", ()=>{
        axios.get("http://localhost:9090/outStatus/MyPatient", {params : {doctorID : doctorID}})
        .then((res)=> {
          setMyPatientList(res.data)
        })}),100)
  },[doctorID])

  useEffect(() => {

    axios.get("http://localhost:9090/outStatus/MyPatient", {params : {doctorID : doctorID}})
      .then((res)=> {
        setMyPatientList(res.data)
      });

    axios.get("http://localhost:9090/outStatus/PatientNum", {params : {doctorID : doctorID}})
      .then((res)=> {
        setMyPatientNum(res.data)
    });

      
  }, [doctorID])

  const getMyPatientInfo = (receivePk, patientFk) => {

    axios.get("http://localhost:9090/patient/treatmentPatientInfo", 
      {params : {
        receivePk: receivePk,
        patientFk: patientFk
      }})
    .then((res) => {
      setTreatmentPatientInfo(res.data)
    }); 

  } 

  const filterStatus = (status) => {
    axios.get("http://localhost:9090/outStatus/filterStatus", {
      params : {
        status: status.getAttribute("name"),
        doctorID: doctorID
      }
    })
      .then((res) => {
        setMyPatientList(res.data)
      })
  }

  return (
    <div className='doctor-patient-status'>
      <p className='section-title'>환자현황</p>
      <div className='line'></div>
      <p className='filtering'><span name={'whole'} onClick={(e) => filterStatus(e.target)}>전체</span>({myPatientNum.WHOLE}) &nbsp;<span name={'OC'} onClick={(e) => filterStatus(e.target)}>대기중</span>({myPatientNum.WAITING}) &nbsp;<span name={'OB'} onClick={(e) => filterStatus(e.target)}>치료</span>({myPatientNum.CURE}) &nbsp;<span name={'OE'} onClick={(e) => filterStatus(e.target)}> 완료</span>({myPatientNum.DONE})</p>
      <div className='status-wrapper'>
        {myPatientList.map((data, index) => (
            <div key={index} className='waiting-order selected' onClick={() => getMyPatientInfo(data.RECEIVE_ID_PK, data.PATIENT_ID_FK)}>
                <p className='waiting-name'>
                  {data.PATIENT_NAME}
                  <span className='medical-hours'>{data.TIME}</span>
                </p>
                <p className={data.OUTPATIENT_STATUS_CODE}>{data.OP_CODE_NAME}</p>
            </div> 
        ))}
      </div>
    </div>
  )
}

export default ReducedPatientStatus;
