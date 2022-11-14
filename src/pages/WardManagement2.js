import React from 'react'
// style
import '../styles/scss/reset.scss';
import '../styles/wardManagement2.scss';

// components
import EmpBar from '../components/employee/EmpBar';

const WardManagement2 = () => {
  return (
    <div className='ward-management2'>
      <main className='main'>
        <div className='top'>
          <EmpBar />
        </div>
        <div className='item1'>병실조회</div>
        <div className='item2'>환자정보 / 간호기록 /처방기록</div>
        <div className='item3'>환자요청사항</div>
        <div className='item4'>환자일정 / 인계사항/ 입원예정</div>
      </main>
    </div>
  )
}

export default WardManagement2;
