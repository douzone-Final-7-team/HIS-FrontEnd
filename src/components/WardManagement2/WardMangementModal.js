import { parseISO } from 'date-fns';
import React, { useRef} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { changeCareInfo, changeHandover, changeMediRecord, changeScheduleStatus, setCareInfo, setHandOver, setInpatientSchedule, setMediRecord } from '../../redux/AdmissionPatientInfoApi';
import { setStartDate } from '../../redux/outChangeDateSlice';
import {executeModal, globalmodifyElement, modifyElement } from '../../redux/outPatientInfoSlice';

import './wardMangementModal.scss';

const WardMangementModal = () => {

const dispatch = useDispatch()
  
const ModalMode = ()=>{
    dispatch(executeModal(false));
    dispatch(modifyElement(null))
    dispatch(globalmodifyElement(null))

  }

  const selectPeople = useSelector(state=>{
    return state.outPatientInfo.value[0]
  }) 
  const getModalMode = useSelector(state=>{
    return state.outPatientInfo.value[8]
  })

  const getEmpName = useSelector(state=>{
    return state.outPatientInfo.value[9]
  })

  const modifyElements = useSelector(state=>{
    return state.outPatientInfo.value[10]
  })

  const globalModifyElements = useSelector(state=>{
    return state.outPatientInfo.value[11]
  })

  const saveContent = useRef("")
  const saveMedicine = useRef("")
  const saveThirdContent = useRef("")
  const saveScheduleDate = useRef("")
  const saveScheduleName = useRef("")
  const saveScheduleWard = useRef("")
  const saveScheduleRoomNum = useRef("")
  const saveScheduleBed = useRef("")

  

  const specialityName = useSelector(state=>{
    return state.outPatientInfo.value[5]
  }) 


  let treatData;
  let sendElements;

  let modalTitle;
  let modalDate = new Date();
  modalDate = modalDate.getFullYear()+"-"+ (modalDate.getMonth()+1)+"-" + modalDate.getDate();
  let modalWriter = '작성자';
  let modalContentTitle = '간호 기록'
  let patientName;
  selectPeople &&(patientName = selectPeople.name);
  let modalBtn ='등록';
  let addContentTitle = '약 종류';
  let addInput=false
  let thirdTitle = '환자명'
  let literate=true
  let thirdPlaceholder;
  let NewScheduleDate = true;
  let ModalContentPlaceholder = "내용을 작성하세요";
  let medicinePlaceholder = "약명을 작성하세요";
  let insertPatientInfo = true;
  // 간호기록 Update
  if(getModalMode === 'careInfo-modify'){
    modalTitle= 'Modify CareInfo'
    modalBtn = '수정'
    
    if(modifyElements !=null){
      if(modifyElements.nurseName === getEmpName){
    ModalContentPlaceholder = modifyElements.careContent
    if(saveContent.current===""){
      saveContent.current = (modifyElements.careContent)
    }
    treatData = ()=>{
      sendElements ={
      "name": selectPeople.name,
      "ward" : selectPeople.ward,
      "roomNum" : selectPeople.roomNum,
      "bedNum" : selectPeople.bedNum,
      "careContent": saveContent.current,
      "careIdPk" : modifyElements.careIdPk
        }
        sendElements = JSON.stringify(sendElements)
       
      let confirmValue = window.confirm("수정 하시겠습니까 ?");
      if(confirmValue){
        dispatch(executeModal(false))
        dispatch(changeCareInfo(sendElements))
        dispatch(modifyElement(null))
        }     
      }
    }else{
      dispatch(executeModal(false))
    }
  }else{dispatch(executeModal(false))}
  }


  // 간호기록 Create
  else if(getModalMode === 'careInfo-create'){
    modalTitle= 'Create CareInfo'
    treatData = ()=>{
    sendElements ={
    "name": selectPeople.name,
    "ward" : selectPeople.ward,
    "roomNum" : selectPeople.roomNum,
    "bedNum" : selectPeople.bedNum,
    "nurseName" : getEmpName,
    "careContent" :  saveContent.current
      }
      sendElements = JSON.stringify(sendElements)
      
      if(saveContent.current === ""){
        alert("빈값이 존재 합니다 확인 해주세요")
      }else{
        let confirmValue = window.confirm("등록하시겠습니까 ?");
        if(confirmValue){
          dispatch(executeModal(false))
          dispatch(setCareInfo(sendElements))
          }      
        }
    }
  }

  // 처방기록 Update
  else if(getModalMode === 'medi-check-modify'){
    modalTitle= 'Modify Medicine Record'
    modalBtn = '수정'
    modalContentTitle = '처방 기록'
    if(modifyElements !=null){
      if(modifyElements.oderer === getEmpName){
      ModalContentPlaceholder = modifyElements.orderContent
      medicinePlaceholder = modifyElements.medicineName
      addInput = true
      if(saveContent.current===""){
        saveContent.current= (modifyElements.orderContent)
      }
      if(saveMedicine.current === ""){
        saveMedicine.current=(modifyElements.medicineName)
      }
      treatData = ()=>{
        sendElements ={
        "name": selectPeople.name,
        "ward" : selectPeople.ward,
        "roomNum" : selectPeople.roomNum,
        "bedNum" : selectPeople.bedNum,
        "orderContent": saveContent.current,
        "recordIdPk" : modifyElements.recordIdPk,
        "medicineName": saveMedicine.current
          }
          sendElements = JSON.stringify(sendElements)
          let confirmValue = window.confirm("수정 하시겠습니까 ?");
          if(confirmValue){
            dispatch(executeModal(false))
            dispatch(changeMediRecord(sendElements))
            dispatch(modifyElement(null))
            }     
        }
      }
      else{
        dispatch(executeModal(false))
      }
    }
    else{dispatch(executeModal(false))}
}

//처방기록 Create
else if(getModalMode === 'medi-check-create'){
    modalTitle= 'Create Medicine Record'
    modalContentTitle = '처방 기록'
    addInput = true;

    treatData = ()=>{
    sendElements ={
      "name": selectPeople.name,
      "ward" : selectPeople.ward,
      "roomNum" : selectPeople.roomNum,
      "bedNum" : selectPeople.bedNum,
      "oderer" : getEmpName,
      "oderContent" :  saveContent.current,
      "medicineName" : saveMedicine.current
      }
    sendElements = JSON.stringify(sendElements)
   
    if(saveContent.current === "" || saveMedicine.current === ""){
      alert("빈값이 존재 합니다 확인 해주세요")
    }else{
      let confirmValue = window.confirm("등록하시겠습니까 ?");
      if(confirmValue){
        dispatch(executeModal(false))  
        dispatch(setMediRecord(sendElements))
        }      
      }
    }
  }
// 인계 사항 Update
  else if(getModalMode === 'handover-modify'){
    modalTitle= 'Modify HandOver'
    modalBtn = '수정'
    thirdTitle = '인계자'
    modalContentTitle = '인계 사항'
    literate =false

    if(globalModifyElements !=null){
      // 이부분 아래계정이름으로 구분 하도록 나중에 변경 현제는 이름이 달라도 일단 눌러진다
      //getEmpName 으로 대체 준비
      if(globalModifyElements.userName === '최정현'){
        thirdPlaceholder = globalModifyElements.handOverTarget
        ModalContentPlaceholder = globalModifyElements.handOverContent
        if(saveContent.current===""){
          saveContent.current= globalModifyElements.handOverContent
          }
        if(saveThirdContent.current === ""){
            saveThirdContent.current= globalModifyElements.handOverTarget
          }
        treatData = ()=>{
            sendElements ={
            "userName": "wjdgus",
            "handOverTarget" : saveThirdContent.current,
            "handOverContent" : saveContent.current,
            "handOverPK" : globalModifyElements.handOverPK
              }
              sendElements = JSON.stringify(sendElements)
              let confirmValue = window.confirm("수정 하시겠습니까 ?");
              if(confirmValue){
                dispatch(executeModal(false))
                dispatch(changeHandover(sendElements))
                dispatch(globalmodifyElement(null))
                } 
            }
      }
      else{
        dispatch(executeModal(false))
      }
     
  } else{dispatch(executeModal(false))}
}
// 인계 사항 create  
  else if(getModalMode === 'handover-create'){
    modalTitle= 'Create HandOver'
    thirdTitle = '인계자'
    thirdPlaceholder = '인계자'
    modalContentTitle = '인계 사항'
    literate =false
    treatData = ()=>{
    sendElements ={
      "userName": "wjdgus",
      "handOverTarget" : saveThirdContent.current,
      "handOverContent" : saveContent.current
    }
    sendElements = JSON.stringify(sendElements)
   
    if(saveContent.current === "" || saveThirdContent.current === ""){
      alert("빈값이 존재 합니다 확인 해주세요")
    }else{
      let confirmValue = window.confirm("등록하시겠습니까 ?");
      if(confirmValue){
        dispatch(executeModal(false))
        dispatch(setHandOver(sendElements));
        }      
      }  
    }

  } 
// 해당 병동 전체 환자일정  Update  
  else if(getModalMode === 'schedule-modify'){
    modalTitle= 'Modify Schedule'
    modalBtn = '수정'
    thirdTitle = '위치'
    thirdPlaceholder = '위치를 작성하세요'
    modalContentTitle = '일정 내용'
    literate =false
    NewScheduleDate=false

    if(globalModifyElements !=null){
        thirdPlaceholder = globalModifyElements.schedulePlace
        ModalContentPlaceholder = globalModifyElements.scheduleContent
        if(saveContent.current===""){
          saveContent.current= (globalModifyElements.scheduleContent)
          }
        if(saveThirdContent.current === ""){
            saveThirdContent.current=(globalModifyElements.schedulePlace)
          }
        if(saveScheduleDate.current === ""){
            saveScheduleDate.current=(globalModifyElements.scheduleDate)
          }
        treatData = ()=>{
            sendElements ={
            "scheduleDate": saveScheduleDate.current,
            "schedulePlace" : saveThirdContent.current,
            "scheduleContent" : saveContent.current,
            "scheduleIdPk" : globalModifyElements.scheduleIdPk,
            "specialityName":specialityName.specialityName,
            "LastModifier": getEmpName

              }
              let newdate = parseISO(saveScheduleDate.current)
              sendElements = JSON.stringify(sendElements)
              let confirmValue = window.confirm("수정 하시겠습니까 ?");
              if(confirmValue){
                dispatch(executeModal(false))
                dispatch(changeScheduleStatus(sendElements))
                dispatch(globalmodifyElement(null))
                dispatch(setStartDate(newdate))
              } 
             }
        }
        else{dispatch(executeModal(false))}
  }
  

  //해당 병동 전체 환자일정  create 
  else if(getModalMode === 'schedule-create'){
    modalTitle= 'Create Schedule'
    modalContentTitle = '일정 내용'
    modalWriter= '환자 정보'
    thirdTitle = '위치'
    thirdPlaceholder = '위치를 작성하세요'
    literate =false
    NewScheduleDate = false
    insertPatientInfo = false
    treatData = ()=>{
    sendElements ={
      "name": saveScheduleName.current,
      "ward" : saveScheduleWard.current,
      "roomNum" : saveScheduleRoomNum.current,
      "bedNum" : saveScheduleBed.current,
      "schedulePlace" : saveThirdContent.current,
      "scheduleContent" :  saveContent.current,
      "scheduleDate" : saveScheduleDate.current,
      "specialityName" : specialityName.specialityName,
      "LastModifier": getEmpName

    }
    if(saveScheduleName.current === "" || saveScheduleWard.current === "" ||
    saveScheduleRoomNum.current === "" || saveScheduleBed.current === "" ||
    saveThirdContent.current === "" || saveContent.current === "" ||
    saveScheduleDate.current === ""
    ){
      alert("빈값이 존재 합니다 확인 해주세요")
    }else{
      let confirmValue = window.confirm("등록하시겠습니까 ?");
      if(confirmValue){
        dispatch(executeModal(false))
        dispatch(setInpatientSchedule(sendElements))
        }      
      }
    }
  }
return(
<div className='wppaer' onClick={ModalMode}>
  <div className="container" onClick={(e) => e.stopPropagation()}>  
        <div id="contact">
            <h3>{modalTitle}</h3>
            <fieldset>
                <h5>날짜</h5>
                {NewScheduleDate ? <input type="text" tabindex="1" readOnly value={modalDate}/>
                : <input type="datetime-local" tabindex="1" onChange={(e)=>saveScheduleDate.current=(e.target.value)}/>
                  }
            </fieldset>
            <fieldset>
                <h5>{modalWriter}</h5>
                {insertPatientInfo ? <input type="text" tabindex="2" readOnly value={getEmpName}/> 
                :
                <div className='outinfo-wapper'>
                  <input className='outinfo' tabindex="2"  placeholder='환자명' onChange={(e)=>saveScheduleName.current=(e.target.value)}/>
                  <input className='outinfo' tabindex="2"  placeholder='병동' onChange={(e)=>saveScheduleWard.current=(e.target.value)}/> 
                  <input className='outinfo' tabindex="2"  placeholder='호실' onChange={(e)=>saveScheduleRoomNum.current=(e.target.value)}/>
                  <input className='outinfo' tabindex="2"  placeholder='병상번호' onChange={(e)=>saveScheduleBed.current=(e.target.value)}/>
                </div> 
                }
            </fieldset>
            {literate ? <fieldset>
                <h5>{thirdTitle}</h5>
                <input type="text" tabindex="3" readOnly value={patientName}/>
            </fieldset> : 
            <fieldset>
                <h5>{thirdTitle}</h5>
                <input type="text" tabindex="3" placeholder={thirdPlaceholder} onChange={(e)=>saveThirdContent.current=(e.target.value)}/>
            </fieldset>}
            {addInput && <fieldset>
                <h5>{addContentTitle}</h5>
                <input type="text" placeholder={medicinePlaceholder} tabindex="4" onChange={(e)=>saveMedicine.current=e.target.value}/>
            </fieldset>}
            <fieldset>
                <h5>{modalContentTitle}</h5>
                <textarea placeholder= {ModalContentPlaceholder} tabindex="5" required onChange={(e)=>saveContent.current= e.target.value}></textarea>
            </fieldset>
            <fieldset>
              <button name="submit" type="btn" id="contact-submit" data-submit="...Sending" onClick={treatData}>{modalBtn}</button>
            </fieldset>
        </div>
    </div>
</div>
    )
}

export default WardMangementModal;