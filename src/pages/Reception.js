import React from 'react'
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


const Reception = () => {
  return (
    <div className='reception'>
      <main className='main'>
        <div className='top'>
          <EmpBar />
        </div>
        <div className='middle'>
          <div className='search-info'>
            <div className='input-patient'>
              <form action=''>
                <label>이름</label>
                <input />
                <label>주민등록번호</label>
                <input type='number'/> - <input type='number'/>
              </form>
            </div>
            <div className='btns'>
              <a href='#!' className='btn'>등록</a>
              <a href='#!' className='btn '>접수</a>
            </div>
          </div>
          <PatientDetail/>
          <MedicalHistory />
        </div>
        <PatientStatus className='bottom1'/>
        <Waiting4Payment/>
        <Receipt/>
      </main>
    </div>
  )
}

export default Reception;


