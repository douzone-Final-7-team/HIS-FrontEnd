import React, { useEffect, useRef } from 'react'
import { useState } from "react";

// style
import  "react-datepicker/dist/react-datepicker.css" ;
import DatePicker from "react-datepicker";
import './outpatientschedule.scss';
//redux
import {  useDispatch, useSelector } from 'react-redux';
import { getInpatientSchedules } from '../../redux/AdmissionPatientInfoApi';
import { executeModal, modalMode, globalmodifyElement} from '../../redux/outPatientInfoSlice';
import { setStartDate } from '../../redux/outChangeDateSlice';


const OutDatePicker = () => {

  const startDate = useSelector(state=>{
    return state.outChangeDate.value
  }) 

  console.log(startDate)
  // const [changeDate ,setchangeDate] = useState()
  const changeDate = useRef("")
  const dispatch = useDispatch();

  const scheduleInfoEelement = useSelector(state=>{
    return state.outPatientInfo.value[5]
  }) 

  useEffect(()=>{

    changeDate.current = (startDate.getFullYear().toString() +"-"+ `${startDate.getUTCMonth()+ 1}`.toString() +"-"+startDate.getDate().toString())

    let changedScheduleElement = (scheduleInfoEelement != null) && {
      specialityName :scheduleInfoEelement.specialityName,
        searchDate : changeDate.current
    }
    dispatch(getInpatientSchedules(changedScheduleElement))

  },[dispatch, startDate, changeDate, scheduleInfoEelement])
  

  


  return (
    
    <DatePicker selected={startDate} onChange={date => dispatch(setStartDate(date))} dateFormat="yyyy년 MM월 dd일"/>
  );
};

const Outpatientschedule = () => {
  const dispatch = useDispatch();


  const ModalMode = (e)=>{
    let selectMode = e.target.id
    dispatch(executeModal(true))
    dispatch(modalMode(selectMode))

    let handOverCheck=document.getElementsByName("schedule");
    for(let i =0; i < handOverCheck.length ; i++){
      if(handOverCheck[i].checked){
        handOverCheck[i].checked =false;
      }
    }
  }

  const scheduleInfo = useSelector(state=>{
    return state.outPatientInfo.value[4]
  })
    
  const selectRow = (e)=>{
    let changescheduleInfo = {
      scheduleIdPk : scheduleInfo[e.target.id].SCHEDULE_ID_PK,
      scheduleContent : scheduleInfo[e.target.id].SCHEDULE_CONTENT,
      schedulePlace:scheduleInfo[e.target.id].SCHEDULE_PLACE,
      scheduleDate:scheduleInfo[e.target.id].SCHEDULE_DATE
    }
    dispatch(globalmodifyElement(changescheduleInfo))
  }

 
  return (
    <div className='schedule-container'>
      <OutDatePicker/>
      <div className='schedule-wapper'>
        <table>
          <thead>
          {scheduleInfo != null && scheduleInfo[0] != null ? 
            (scheduleInfo[0].errorCode == null &&
            <tr>
              <th>-</th>
              <th>시간</th>
              <th>위치</th>
              <th>일정 내용</th>
              <th>환자명</th>
              <th>상태</th>
            </tr>
            )
          :
            <tr>
              <th>-</th>
              <th>시간</th>
              <th>위치</th>
              <th>일정 내용</th>
              <th>환자명</th>
              <th>상태</th>
            </tr>
          }
            </thead>
            <tbody>
            {scheduleInfo != null && scheduleInfo[0] != null && ((scheduleInfo[0].errorCode == null ?
              (scheduleInfo.map((scheduleInfo, index)=>(
                <tr>
                <td className='schedule-fix'><input type= "radio" name= "schedule" id = {index} onClick={selectRow}/></td>
                <td>{(scheduleInfo.SCHEDULE_DATE).substring(11,16)}</td>
                <td>{scheduleInfo.SCHEDULE_PLACE}</td>
                <td className='schedule-content'>{scheduleInfo.SCHEDULE_CONTENT}</td>
                <td >{scheduleInfo.PATIENT_NAME}</td>
                <td>{scheduleInfo.PS_CODE_NAME}</td>
              </tr>
            ))):<div className='schedule-error'>존재하지 않는 환자 정보입니다. 확인 후 입력 해주세요</div>
          ))}
          </tbody>
        </table>
      </div>
      <div className='btn-wapper' >
        <a href='#!' className='btn' id='schedule-modify' onClick={ModalMode}>수정</a> 
        <a href='#!' className='btn' id='schedule-create' onClick={ModalMode}>등록</a>
      </div>
    </div>
  )
}

export default Outpatientschedule ;
