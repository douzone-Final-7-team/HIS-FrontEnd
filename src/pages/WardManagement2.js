import React, { useState } from 'react'
// style
import '../styles/scss/reset.scss';
import '../styles/wardManagement2.scss';
// components
import EmpBar from '../components/employee/EmpBar';
import WardCheck from '../components/patient/WardCheck';
import WardPatientRequest from '../components/WardManagement2/WardPatientRequest';
import WardMangeMentTap from '../components/WardManagement2/WardMangementTab';
import GlobalMangementTab from '../components/WardManagement2/GlobalMangementTab';


const WardManagement2 = () => {


  
  return (
    <div className='ward-management2'>
      <main className='main'>
        <div className='top'>
          <EmpBar />
        </div>
        <div className='item1'>
          <WardCheck/>
        </div>
        <div className='item2'>
        <div className='outpatientDetail-wapper'>
          <WardMangeMentTap/>
        </div>
      </div>
        <div className='item3'>
          <WardPatientRequest/>
        </div>
        <div className='item4'>
          <GlobalMangementTab/>
        </div>
      </main>

    </div>
  );
}

export default WardManagement2;
