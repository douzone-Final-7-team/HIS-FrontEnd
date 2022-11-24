import React from 'react'
// style
import './patientStatus.scss';
// component
import DetailedStatus from './DetailedStatus';

function PatientStatus() {
  return (
    <div className='patient-status'>
      <div>
        <p className='section-title'>환자현황</p>
        <select className='filter'>
          <option>내과</option>
          <option>이비인후과</option>
          <option>정형외과</option>
        </select>
      </div>
      <div className='status'>
        <p>전체(n) 대기중(n) 진료중(n) 치료(n) 완료(n)</p>
        <div>
          <DetailedStatus num={1}/>
          <DetailedStatus num={2}/>
          <DetailedStatus num={3}/>
        </div>
      </div>
    </div>
  )
}

export default PatientStatus;
