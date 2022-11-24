import React from 'react'
// icon
import { AiFillHome } from "react-icons/ai";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
// style
import './empComponents.scss';


function EmpBar() {
  return (
    <div className='emp-info'>
      <div className='emp-location'>
        <AiFillHome />
        <p>&nbsp;/ 진료과 / 업무내용</p>
      </div>

      <div className='emp-bar'>
        <div className='test2'>
          <BsFillArrowRightCircleFill className='icon'/>
          <p><span>근무부서</span>진료과</p>
        </div>                    
        <div className='test2'>
          <BsFillArrowRightCircleFill className='icon'/>
          <p><span>근무일자</span>yyyy-mm-dd [월]</p>
        </div>                    
        <div className='test2'>
          <BsFillArrowRightCircleFill className='icon'/>
          <p><span>근무자</span>진료과 채송화</p>
        </div>
      </div>
    </div>
  )
}

export default EmpBar
