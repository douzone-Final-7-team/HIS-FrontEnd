import React from 'react'
// style
import './wardPatientRequest.scss';

const WardPatientRequest = () => {
  return (
    <div className='reduced-patient-status'>
      <p className='section-title'>환자 호출</p>
      <div className='line'></div>
      <p className='filtering'><span className='the-whole-waiting-list'>전체(n)</span> 호출(n) 완료(n)</p>
      <div className='status-wrapper'>
        <div className='waiting-order'>
            <p className='waiting-name'>
              김더존
              <span className='medical-hours'>11:46</span>
            </p>
          <p className='status-value'>호출</p>
        </div> 
        <div className='waiting-order'>
            <p className='waiting-name'>
              김더존
              <span className='medical-hours'>11:46</span>
            </p>
          <p className='status-value'>호출</p>
        </div> 
        <div className='waiting-order'>
            <p className='waiting-name'>
              김더존
              <span className='medical-hours'>11:46</span>
            </p>
          <p className='status-value'>호출</p>
        </div> 
        <div className='waiting-order'>
            <p className='waiting-name'>
              김더존
              <span className='medical-hours'>11:46</span>
            </p>
          <p className='status-value'>호출</p>
        </div> 
        <div className='waiting-order completion'>
            <p className='waiting-name'>
              김더존
              <span className='medical-hours'>11:46</span>
            </p>
          <p className='status-value'>호출</p>
        </div>
        <div className='waiting-order completion'>
            <p className='waiting-name'>
              김더존
              <span className='medical-hours'>11:46</span>
            </p>
          <p className='status-value'>호출</p>
        </div>
        <div className='waiting-order completion'>
            <p className='waiting-name'>
              김더존
              <span className='medical-hours'>11:46</span>
            </p>
          <p className='status-value'>호출</p>
        </div>
        <div className='waiting-order completion'>
            <p className='waiting-name'>
              김더존
              <span className='medical-hours'>11:46</span>
            </p>
          <p className='status-value'>호출</p>
        </div>
        <div className='waiting-order completion'>
            <p className='waiting-name'>
              김더존
              <span className='medical-hours'>11:46</span>
            </p>
          <p className='status-value'>호출</p>
        </div>
      </div>
    </div>
  )
}

export default WardPatientRequest;
