import React from 'react'
// style
import './waiting4Payment.scss';

const Waiting4Payment = () => {
  return (
    <div className='waiting-4-payment'>
      <p className='section-title'>수납 대기 인원</p>
      <div className='content-box'>
        <div className='waited-people'>
          <div className='waiting-order'>
              <p className='waiting-name'>
                김더존
                <span className='medical-hours'>11:46</span>
              </p>
            <p className='status-value'>수납대기</p>
          </div>
          <div className='waiting-order'>
              <p className='waiting-name'>
                김더존
                <span className='medical-hours'>11:46</span>
              </p>
            <p className='status-value'>수납대기</p>
          </div>
          <div className='waiting-order'>
              <p className='waiting-name'>
                김더존
                <span className='medical-hours'>11:46</span>
              </p>
            <p className='status-value'>수납대기</p>
          </div>
          <div className='waiting-order'>
              <p className='waiting-name'>
                김더존
                <span className='medical-hours'>11:46</span>
              </p>
            <p className='status-value'>수납대기</p>
          </div>
          <div className='waiting-order completion'>
              <p className='waiting-name'>
                김더존
                <span className='medical-hours'>11:46</span>
              </p>
            <p className='status-value'>완료</p>
          </div>
        </div> 
      </div>
    </div>
  )
}

export default Waiting4Payment;
