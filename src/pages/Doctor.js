import React from 'react'
// style
import '../styles/scss/reset.scss';
import '../styles/doctor.scss';

// components
import Header from '../layouts/Header';
import Nav from '../components/nav/Nav';
import EmpBar from '../components/employee/EmpBar';
import ReducedPatientStatus from '../components/patient/ReducedPatientStatus';


const Doctor = () => {
  return (
    <div className='doctor'>
      <main className='main'>
        <div className='top'>
          <EmpBar />
        </div>
        <div className='item1'>환자정보</div>
        <div className='item2'>캘린더</div>
        <div className='item3'>입원내역</div>
        <div className='item4'>치료오더</div>
        <ReducedPatientStatus />
      </main>
    </div>

  )
}

export default Doctor
