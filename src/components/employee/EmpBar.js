import React, { useEffect, useState} from 'react'
// icon
import { AiFillHome } from "react-icons/ai";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
// style
import './empComponents.scss';

//redux
import { useDispatch } from 'react-redux';
// import { getInpatientSchedules } from '../../redux/AdmissionPatientInfoApi';
import { getEmpName, getSpecialityName } from '../../redux/outPatientInfoSlice';
import axios from 'axios';

function EmpBar() {
  
  const [empBar, setEmpBar] = useState([{}]);
  const token = localStorage.getItem('jwt') || '';
  const dispatch = useDispatch();
  const newDate = new Date();
  let today = newDate;
  today = today.getFullYear()+"-"+ (today.getMonth()+1)+"-" + today.getDate();

  useEffect(()=>{

    axios.get("http://localhost:9090/user/headerInfo", {
      headers: {'Authorization': token,}
    })
    .then((res) => {
      console.log(res.data)
      setEmpBar(res.data);
    })

    const specialityName = document.getElementById("speciality").innerText.substring(4)
    const empName = document.getElementById("empName").innerText.substring(3)
    let specialityElements = {
      specialityName :specialityName,
      searchDate :today
    }

    dispatch(getSpecialityName(specialityElements))
    // dispatch(getInpatientSchedules(specialityElements))
    dispatch(getEmpName(empName))
  
  },[dispatch, today, token])


  return (
    <div className='emp-info'>
      <div className='emp-location'>
        <AiFillHome />
        <p>&nbsp;/ {empBar[0].SPECIALITY_NAME} / {empBar[0].WORK}</p>
      </div>

      <div className='emp-bar'>
        <div className='test2'>
          <BsFillArrowRightCircleFill className='icon'/>
          <p id= "speciality"><span>근무부서</span>{empBar[0].SPECIALITY_NAME}</p>
        </div>                    
        <div className='test2'>
          <BsFillArrowRightCircleFill className='icon'/>
          <p><span>근무일자</span>{empBar[0].WORKING_DATE} [{empBar[0].WORKING_DAY}]</p>
        </div>                    
        <div className='test2'>
          <BsFillArrowRightCircleFill className='icon'/>
          <p id= "empName"><span>근무자</span>{empBar[0].EMP_NAME}</p>
        </div>                    
      </div>
    </div>
  )
}

export default EmpBar
