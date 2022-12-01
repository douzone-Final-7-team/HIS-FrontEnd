import React, { useEffect, useRef } from 'react'

// style
import  "react-datepicker/dist/react-datepicker.css" ;
import DatePicker from "react-datepicker";
import './Inpatientschedule.scss';
//redux
import {  useDispatch, useSelector } from 'react-redux';
import { getInpatientSchedules } from '../../redux/AdmissionPatientInfoApi';
import { executeModal, modalMode, globalmodifyElement} from '../../redux/InPatientInfoSlice';
import { setStartDate } from '../../redux/InChangeDateSlice';


const InDatePicker = () => {

  const startDate = useSelector(state=>{
    return state.inChangeDate.value[0]
  })
  const changeDate = useRef("")
  changeDate.current = startDate;
  const dispatch = useDispatch();

  const scheduleInfoEelement = useSelector(state=>{
    return state.inPatientInfo.value[5]
  }) 
  
  useEffect(()=>{

    changeDate.current = (startDate.getFullYear().toString() +"-"+
    ("00" + `${startDate.getMonth()+ 1}`.toString()).slice(-2) +"-"+("00" + startDate.getDate()).slice(-2));
    
    let changedScheduleElement = (scheduleInfoEelement != null) && {
      specialityName :scheduleInfoEelement.specialityName,
      scheduleDate : changeDate.current
    }
    if(changedScheduleElement){
      dispatch(getInpatientSchedules(changedScheduleElement))
    }
  },[dispatch, startDate,scheduleInfoEelement])

  return (
    
    <DatePicker id = "datePicker" selected={changeDate.current} onChange={date => dispatch(setStartDate(date))} dateFormat="yyyy년 MM월 dd일"/>
  );
};

const Inpatientschedule = () => {
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
    return state.inPatientInfo.value[4]
  })
    
  const selectRow = (e)=>{
    let changescheduleInfo = {
      scheduleIdPk : scheduleInfo[e.target.id].SCHEDULE_ID_PK,
      scheduleContent : scheduleInfo[e.target.id].SCHEDULE_CONTENT,
      schedulePlace:scheduleInfo[e.target.id].SCHEDULE_PLACE,
      scheduleDate:scheduleInfo[e.target.id].SCHEDULE_DATE,
      scheduleStatus:scheduleInfo[e.target.id].PS_CODE_NAME
    }
    dispatch(globalmodifyElement(changescheduleInfo))
  }


 
  return (
    <div className='schedule-container'>
      <InDatePicker/>
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
            {scheduleInfo != null && scheduleInfo[0] != null && ((scheduleInfo[0].errorCode == null &&
              (scheduleInfo.map((scheduleInfo, index)=>(
                <tr key={index}>
                <td className='schedule-fix'><input type= "radio" name= "schedule" id = {index} onClick={selectRow}/></td>
                <td>{(scheduleInfo.SCHEDULE_DATE).substring(11,16)}</td>
                <td>{scheduleInfo.SCHEDULE_PLACE}</td>
                <td className='schedule-content'>{scheduleInfo.SCHEDULE_CONTENT}</td>
                <td >{scheduleInfo.PATIENT_NAME}</td>
                <td>{scheduleInfo.PS_CODE_NAME}</td>
              </tr>
            )))))}
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

export default Inpatientschedule ;
