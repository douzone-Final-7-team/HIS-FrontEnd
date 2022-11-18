import React, { useEffect } from 'react'
import { useState } from "react";

// style
import  "react-datepicker/dist/react-datepicker.css" ;
import DatePicker from "react-datepicker";
import './outpatientschedule.scss';
//redux
import {  useDispatch, useSelector } from 'react-redux';
import { getInpatientSchedules } from '../../redux/AdmissionPatientInfoApi';


const OutDatePicker = () => {

  const [startDate, setStartDate] = useState(new Date());
  const [changeDate ,setchangeDate] = useState()
  const dispatch = useDispatch();

  const scheduleInfoEelement = useSelector(state=>{
    return state.outPatientInfo.value[5]
  }) 

  useEffect(()=>{

    setchangeDate(startDate.getFullYear().toString() +"-"+ `${startDate.getUTCMonth()+ 1}`.toString() +"-"+startDate.getDate().toString())

    let changedScheduleElement = (scheduleInfoEelement != null) && {
      specialityName :scheduleInfoEelement.specialityName,
        searchDate : changeDate
    }
    dispatch(getInpatientSchedules(changedScheduleElement))

  },[setchangeDate, dispatch, startDate, changeDate, scheduleInfoEelement])

  


  return (
    
    <DatePicker selected={startDate} onChange={date => setStartDate(date)} dateFormat="yyyy년 MM월 dd일"/>
  );
};

const Outpatientschedule = () => {

  const scheduleInfo = useSelector(state=>{
    return state.outPatientInfo.value[4]
  })  


 
  return (
    <div className='schedule-container'>
      <OutDatePicker/>
      <div className='schedule-wapper'>
        <table>
          <thead>
            <tr>
              <th>-</th>
              <th>날짜</th>
              <th>위치</th>
              <th>일정 내용</th>
              <th>환자명</th>
              <th>상태</th>
            </tr>
            </thead>
            <tbody>
            {scheduleInfo != null &&
              scheduleInfo.map((scheduleInfo, index)=>(
                <tr key = {index}>
                <td className='schedule-fix'><input type= "radio" name= "schedule"/></td>
                <td>{(scheduleInfo.SCHEDULE_DATE + " ").substring(0,10)}</td>
                <td>{scheduleInfo.SCHEDULE_PLACE}</td>
                <td className='schedule-content'>{scheduleInfo.SCHEDULE_CONTENT}</td>
                <td >{scheduleInfo.PATIENT_NAME}</td>
                <td>{scheduleInfo.PS_CODE_NAME}</td>
              </tr>
            ))}

          
          </tbody>
        </table>
      </div>
      <div className='btn-wapper' >
        <a href='#!' className='btn'>수정</a> 
        <a href='#!' className='btn'>등록</a>
      </div>
    </div>
  )
}

export default Outpatientschedule ;
