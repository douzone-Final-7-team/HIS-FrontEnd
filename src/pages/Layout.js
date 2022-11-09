import React from 'react';
// style
import '../styles/scss/reset.scss';
import '../styles/layout.scss';
import '../styles/common.scss';
// components
import Header from '../layouts/Header';
import Nav from '../components/nav/Nav';
import EmpBar from '../components/employee/EmpBar';
import PatientDetail from '../components/patient/PatientDetail';
import PatientStatus from '../components/patient/PatientStatus';


const Layout = () => {
  return (
    <div className='layout'>
      <header><Header /></header>
      <nav><Nav /></nav>
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
              <a href='#' className='btn'>등록</a>
              <a href='#' className='btn '>접수</a>
            </div>
          </div>
          <PatientDetail/>
          <div className='sample'>과거병력</div>
        </div>
        <PatientStatus className='bottom1'/>
        <div className='bottom2 test'>4</div>
        <div className='bottom3 test'>5</div>
      </main>
    </div>

  )
}

export default Layout
