import React, { useEffect } from 'react'
// icon
import { AiFillHome } from "react-icons/ai";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
// style
import './empComponents.scss';

//redux
import { useDispatch } from 'react-redux';
import { getInpatientSchedules } from '../../redux/AdmissionPatientInfoApi';
import { getSpecialityName } from '../../redux/outPatientInfoSlice';

function EmpBar() {
  
  const dispatch = useDispatch();
  let date= new Date()
  date = date.getFullYear()+"-"+ (date.getMonth()+1)+"-" + date.getDate()
  const realdata = date
  
  useEffect(()=>{

    const specialityName = document.getElementById("speciality").innerText.substring(4)
    let specialityElements = {
      specialityName :specialityName,
      searchDate : realdata
    }

    dispatch(getSpecialityName(specialityElements))
    dispatch(getInpatientSchedules(specialityElements))
  
  },[dispatch, realdata])


  return (
    <div className='emp-info'>
      <div className='emp-location'>
        <AiFillHome />
        <p>&nbsp;/ 진료과 / 업무내용</p>
      </div>

      <div className='emp-bar'>
        <div className='test2'>
          <BsFillArrowRightCircleFill className='icon'/>
          <p id= "speciality"><span>근무부서</span>내과</p>
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
