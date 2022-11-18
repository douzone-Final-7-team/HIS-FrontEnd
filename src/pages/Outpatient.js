import React from 'react'
// style
import '../styles/scss/reset.scss';
import '../styles/outpatient.scss';
// components
import EmpBar from '../components/employee/EmpBar';
import PatientDetail from '../components/patient/PatientDetail';
import PatientStatus from '../components/patient/PatientStatus';

const Outpatient = () => {
  return (
    <div className='outpatient'>
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
          <div className='sample'>과거병력</div>
        </div>
        <PatientStatus className='bottom1'/>
        <div className='order'>진료메모/치료오더</div>
      </main>
    </div>
  )
}

export default Outpatient;
