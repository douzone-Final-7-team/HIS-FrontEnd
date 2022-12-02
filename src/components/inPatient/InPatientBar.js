import React from 'react'
// icon
import { BsFillArrowRightCircleFill } from "react-icons/bs";
// style
import './inPatientBar.scss';

//redux


function InPatientBar() {
  

  return (
    <div className='emp-info2'>
      <div className='emp-bar'>
        <div className='test2'>
          <BsFillArrowRightCircleFill className='icon'/>
          <p id= "speciality"><span>진료과</span> 내과</p>
        </div>                    
        <div className='test2'>
          <BsFillArrowRightCircleFill className='icon'/>
          <p><span>병동</span>200</p>
        </div>                    
        <div className='test2'>
          <BsFillArrowRightCircleFill className='icon'/>
          <p id= "empName"><span>호실</span>1</p>
        </div>
        <div className='test2'>
          <BsFillArrowRightCircleFill className='icon'/>
          <p id= "empName"><span>병상</span>1</p>
        </div>                        
      </div>
    </div>
  )
}

export default InPatientBar
