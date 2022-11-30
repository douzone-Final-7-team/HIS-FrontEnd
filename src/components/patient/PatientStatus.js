import React, { useEffect, useState } from 'react'
// style
import './patientStatus.scss';
// component
import DetailedStatus from './DetailedStatus';
import axios from 'axios';
import './detailedStatus.scss';

function PatientStatus() {

  const [speciality, setSpeciality] = useState('내과');
  const [patientStatus, setPatientStatus] = useState();
  useEffect(()=>{
    axios.post("http://43.200.169.159:9090/outStatus/getdocpat", {
      SPECIALITY_ID_FK: (speciality === '내과' ? 'N' : speciality === '이비인후과' ? 'E' : speciality === '정형외과' ? 'J' : ' ') 
      }).then((res)=>{
        setPatientStatus(res.data)
      });
  },[speciality]);


  // 혜지 환자현황 클릭 이벤트
  const handleClick = () => {
    // dispatch(readOutpatientInfo());
  }

  
  return (
    <div className='patient-status'>
      <div>
        <p className='section-title'>환자현황</p>
        <select className='filter' onChange={(e) => {
                setSpeciality(e.target.value);
              }}>
          <option>내과</option>
          <option>이비인후과</option>
          <option>정형외과</option>
        </select>
      </div>
      <div className='status'>
        <p>전체(n) 대기중(n) 진료중(n) 치료(n) 완료(n)</p>
        <div>
          {patientStatus!==null && patientStatus!==undefined? patientStatus.map((data, index) => (
            <DetailedStatus key={index} data={data} index={index} onClick={handleClick}/>
          )):""}
        </div>
      </div>
    </div>
  )
}

export default PatientStatus;
