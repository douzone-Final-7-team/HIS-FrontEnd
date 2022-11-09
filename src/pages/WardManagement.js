import React from 'react'
// style
import '../styles/scss/reset.scss';
import '../styles/wardManagement.scss';
// components
import Header from '../layouts/Header';
import Nav from '../components/nav/Nav';
import EmpBar from '../components/employee/EmpBar';
import WardCheck from '../components/patient/WardCheck';


const WardManagement = () => {
  return (
    <div className='ward-management'>
      <header><Header/></header>
      <nav><Nav /></nav>
      <main className='main'>
        <div className='top'>
          <EmpBar />
        </div>
        <div className='bed-count'>
          <p className='count-title'>총 병상수</p>
          <p className='count'>&gt; <span>20</span></p>
          <div className='line'></div>
        </div>
        <div className='bed-count'>
          <p className='count-title'>가동 병상수</p>
          <p className='count'>&gt; <span>11</span></p>
          <div className='line'></div>
        </div>
        <div className='bed-count'>
          <p className='count-title'>빈 병상수</p>
          <p className='count'>&gt; <span>9</span></p>
          <div className='btn'>가용병상</div>
          <div className='line'></div>
        </div>
        <div className='bed-count'>
          <p className='count-title'>금일 퇴원예정자</p>
          <p className='count'>&gt; <span>9</span></p>
          <div className='line'></div>
        </div>
        <WardCheck />
        <div className='tab'>수납/입원요청/퇴원예정</div>
      </main>
    </div>

  )
}

export default WardManagement;
