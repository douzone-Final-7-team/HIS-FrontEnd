import React, { useEffect} from 'react'
// icon
import { AiFillHome } from "react-icons/ai";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
// style
import './empComponents.scss';

//redux
import { useDispatch } from 'react-redux';
import { getEmpName, getSpecialityName } from '../../redux/InPatientInfoSlice';

function EmpBar() {
  
  const dispatch = useDispatch();
  const name = window.localStorage.getItem('name');
  const specialityName = window.localStorage.getItem('specialityName');

  const newDate = new Date();
  let today = newDate;
  today = today.getFullYear()+"-"+ ("00" + (today.getMonth()+1)).slice(-2)+ "-" + ("00" + today.getDate()).slice(-2);

  useEffect(()=>{
    const specialityName = document.getElementById("speciality").innerText.substring(4)
    const empName = document.getElementById("empName").innerText.substring(3)
    let specialityElements = {
      specialityName :specialityName,
      scheduleDate :today
    }
    dispatch(getSpecialityName(specialityElements))
    dispatch(getEmpName(empName))
  },[dispatch, today])


  return (
    <div className='emp-info'>
      <div className='emp-location'>
        <AiFillHome />
        <p>&nbsp;/ 진료과 / 업무내용</p>
      </div>

      <div className='emp-bar'>
        <div className='test2'>
          <BsFillArrowRightCircleFill className='icon'/>
          <p id= "speciality"><span>근무부서</span>{specialityName}</p>
        </div>                    
        <div className='test2'>
          <BsFillArrowRightCircleFill className='icon'/>
          <p><span>근무일자</span>{today != null && today}</p>
        </div>                    
        <div className='test2'>
          <BsFillArrowRightCircleFill className='icon'/>
          <p id= "empName"><span>근무자</span>{name}</p>
        </div>                    
      </div>
    </div>
  )
}

export default EmpBar
