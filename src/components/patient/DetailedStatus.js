import axios from 'axios';
import React from 'react'
// style
import './detailedStatus.scss';


const DetailedStatus = ({data, index}) => {
  
  return (
    <div className='detailed-status'>
      <p>{index+1}진료실 {data.EMP_NAME}</p>
      <div className='order-content'>
            {data.patInfo.map((data, index) => (
              <div key={index} className='waiting-order selected'>
                <p className='waiting-name'>
                  {data.patName}
                  <span className='medical-hours'>{data.regTime}</span>
                </p>
                <p className='status-value'>{data.status}</p>
              </div> 
            ))}
            </div>
    </div>
  )
}

export default DetailedStatus;
