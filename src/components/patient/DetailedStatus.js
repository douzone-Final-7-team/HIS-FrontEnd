import React from 'react'
// style
import './detailedStatus.scss';


const DetailedStatus = () => {
  return (
    <div className='detailed-status'>
      <p>1진료실 홍길동(n)</p>
      <div className='order-content'>
        <div className='waiting-order selected'>
            <p className='waiting-name'>
              김더존
              <span className='medical-hours'>11:46</span>
            </p>
          <p className='status-value'>대기중</p>
        </div> 
        <div className='waiting-order'>
            <p className='waiting-name'>
              김더존
              <span className='medical-hours'>11:46</span>
            </p>
          <p className='status-value'>대기중</p>
        </div> 
        <div className='waiting-order'>
            <p className='waiting-name'>
              김더존
              <span className='medical-hours'>11:46</span>
            </p>
          <p className='status-value'>대기중</p>
        </div> 
        <div className='waiting-order'>
            <p className='waiting-name'>
              김더존
              <span className='medical-hours'>11:46</span>
            </p>
          <p className='status-value'>진찰중</p>
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
  )
}

export default DetailedStatus;
