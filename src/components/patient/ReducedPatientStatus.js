import axios from 'axios';
import React, { useEffect, useRef } from 'react'
// style
import './reducedPatientStatus.scss';

const ReducedPatientStatus = ({ setTreatmentPatientInfo }) => {

  const myPatientList = useRef([{}]);

  useEffect(() => {

    axios.get("http://localhost:9090/outStatus/MyPatient")
      .then((res) => {
        console.log(res.data)
        myPatientList.current = res.data
      });
  }, [])

  const getMyPatientInfo = (receivePk) => {

    console.log(receivePk);

    axios.get("http://localhost:9090/patient/treatmentPatientInfo", {params : {receivePk: receivePk}})
    .then((res) => {
      console.log(res.data)
      setTreatmentPatientInfo(res.data)
    }); 

  } 

  return (
    <div className='reduced-patient-status'>
      <p className='section-title'>환자현황</p>
      <div className='line'></div>
      <p className='filtering'><span className='the-whole-waiting-list'>전체(n)</span> 대기(n) 진찰중(n) 완료(n)</p>
      <div className='status-wrapper'>
        {myPatientList.current.map((data, index) => (
            <div key={index} className='waiting-order selected' onClick={() => getMyPatientInfo(data.RECEIVE_ID_PK)}>
                <p className='waiting-name'>
                  {data.PATIENT_NAME}
                  <span className='medical-hours'>{data.TIME}</span>
                </p>
                <p className='status-value'>{data.OP_CODE_NAME}</p>
            </div> 
        ))}
      </div>
    </div>
  )
}

export default ReducedPatientStatus;
