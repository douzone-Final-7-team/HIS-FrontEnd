import React, { useEffect} from 'react'
// icon
import { AiFillHome } from "react-icons/ai";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
// style
import './empComponents.scss';

//redux
import { useDispatch } from 'react-redux';
// import { getInpatientSchedules } from '../../redux/AdmissionPatientInfoApi';
import { getEmpName, getSpecialityName } from '../../redux/outPatientInfoSlice';

function EmpBar() {
  
  const dispatch = useDispatch();

  const newDate = new Date();
  let today = newDate;
  today = today.getFullYear()+"-"+ (today.getMonth()+1)+"-" + today.getDate();

  useEffect(()=>{
    const specialityName = document.getElementById("speciality").innerText.substring(4)
    const empName = document.getElementById("empName").innerText.substring(3)
    let specialityElements = {
      specialityName :specialityName,
      searchDate :today
    }

    dispatch(getSpecialityName(specialityElements))
    // dispatch(getInpatientSchedules(specialityElements))
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
          <p id= "speciality"><span>근무부서</span>내과</p>
        </div>                    
        <div className='test2'>
          <BsFillArrowRightCircleFill className='icon'/>
          <p><span>근무일자</span>yyyy-mm-dd [월]</p>
        </div>                    
        <div className='test2'>
          <BsFillArrowRightCircleFill className='icon'/>
          <p id= "empName"><span>근무자</span>채송화</p>
        </div>                    
      </div>
    </div>
  )
}

export default EmpBar
