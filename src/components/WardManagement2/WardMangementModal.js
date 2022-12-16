import axios from 'axios';
import { parseISO} from 'date-fns';
import React, {useEffect, useRef, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { changeCareInfo, changeHandover, changeMediRecord, changeSchedule, setCareInfo, setHandOver, setInpatientSchedule, setMediRecord } from '../../redux/AdmissionPatientInfoApi';
import {setStartDate } from '../../redux/InChangeDateSlice';
import {executeModal, globalmodifyElement, modifyElement} from '../../redux/InPatientInfoSlice';
import { alertSweetError, confrimSweet } from '../higher-order-function/Alert';
import { SearchAddEvent } from '../higher-order-function/SearchFuction';
import './wardMangementModal.scss';


const WardMangementModal = () => {
  
  const dispatch = useDispatch()
  const userName = window.localStorage.getItem('userName');
  const specialityName = window.localStorage.getItem('specialityName');
  const getEmpName = window.localStorage.getItem('name');
  const ward = window.localStorage.getItem('ward');
  const getEmpId = window.localStorage.getItem('empIdPk');

  const ModalMode = ()=>{
      dispatch(executeModal(false));
      dispatch(modifyElement(null));
      dispatch(globalmodifyElement(null));
    };
    const selectPeople = useSelector(state=>{
      return state.inPatientInfo.value[0]
    }); 
    const getModalMode = useSelector(state=>{
      return state.inPatientInfo.value[2]
    });
    const modifyElements = useSelector(state=>{
      return state.inPatientInfo.value[3]
    });
    const globalModifyElements = useSelector(state=>{
      return state.inPatientInfo.value[4]
    });
  const saveContent = useRef("");
  const saveForthContent = useRef("");
  const saveThirdContent = useRef("");
  const saveScheduleDate = useRef("");
  const serachInPatient = useRef("");
  const [inNurseList, setInNurseList]=useState([]);
  const [inNurse, setInNurse]=useState({
      userName : "",
      name:""
      });

  useEffect(()=>{
    axios.post('http://localhost:9090/admission/inNurseList')
    .then(res=>{setInNurseList(res.data)})
  },[]);

  useEffect(()=>{
    const setAllFunc = (e)=>{
      return (setInNurse(()=>{
        return({
          userName :e.target.id,
          name:(e.target.name)
          }) 
      }))};
      
    const addHTMLFunc = (acc)=>{
      return( `
        <div class="suggest-container">
          <a class="suggest-username" style= 'border-bottom:1px #EAEAEA solid; color:black; display:block' 
            id =${acc.EMP_ID_PK} name=${acc.EMP_NAME}>
            이름: ${acc.EMP_NAME} , 소속 : ${acc.SPECIALITY_NAME}, 이메일: ${acc.EMP_EMAIL}</a>
        </div>`)};

    const searchTarget ="EMP_NAME";

    SearchAddEvent("searchInput","suggestions-container", "suggestions-list", inNurseList, addHTMLFunc, setAllFunc,searchTarget);
  },[saveThirdContent,inNurseList]);

  useEffect(()=>{
    let searchInput = document.getElementById("searchInput")
    searchInput.value = searchInput.defaultValue
  },[inNurse]);



  const [inPatientWardList, setInPatientWardList]=useState([]);
  const [inPatientWard, setInPatientWard]=useState({
      name: "",
      ward : "",
      roomNum : "",
      bedNum : ""
      });

  useEffect(()=>{
    axios.get('http://localhost:9090/wardCheck/ocuupiedList', {params : {
      ward : ward
      }}).then(res=> setInPatientWardList(res.data))
    },[ward]);

  useEffect(()=>{
    const addHTMLFunc = (account)=>{
      return( `
        <div class="suggest-container">
          <a style= 'border-bottom:1px #EAEAEA solid; color:black; display:block' 
          id =${account.PATIENT_NAME} name=${account.WARDROOM}${account.BED_NUM}>
          이름: ${account.PATIENT_NAME} , 호실 : ${account.WARDROOM}, 병상번호: ${account.BED_NUM}</a>
        </div>`)};
    
    const setAllFunc = (e)=>{
      return (setInPatientWard(()=>{
        return({
          name: e.target.id,
          ward : (e.target.name + "").substring(0,1)*100,
          roomNum : ("" + e.target.name).substring(2,3),
          bedNum : ("" + e.target.name).substring(3)
          }) 
        }))};

    const searchTarget ="PATIENT_NAME";

    SearchAddEvent("searchPatientInput","searchPatientInput-container", "searchPatientInput-list", inPatientWardList, addHTMLFunc, setAllFunc,searchTarget);

      },[serachInPatient,inPatientWardList]);

    useEffect(()=>{
        const searchInput = document.getElementById("searchPatientInput");
        searchInput.value = searchInput.defaultValue;
    },[inPatientWard]);
      

  let treatData;
  let sendElements;
  let sendPersonalElements = {...selectPeople};
  let modalTitle;
  let modalDate = new Date();
  modalDate = modalDate.getFullYear()+"-"+ (modalDate.getMonth()+1)+"-" + modalDate.getDate();
  let modalWriter = '작성자';
  let modalContentTitle = '간호 기록';
  let modalBtn ='등록';
  let addInput=false;
  let thirdTitle = '환자명';
  let literate=true;
  let thirdDefaultValue = "";
  let NewScheduleDate = true;
  let ModalContentdefaultValue = "";
  let forthdefaultValue = "";
  let insertPatientInfo = true;
  let search = true;

  // 간호기록 Update
  if(getModalMode === 'careInfo-modify'){
    modalTitle= 'Modify CareInfo';
    modalBtn = '수정';
    if(modifyElements !=null){
      if(modifyElements.nurseName === userName){
        ModalContentdefaultValue = modifyElements.careContent;
      if(saveContent.current===""){
        saveContent.current = (modifyElements.careContent);
        };
      treatData = ()=>{
        const doModifyCareInfo= () =>{
          sendPersonalElements.careContent = saveContent.current;
          sendPersonalElements.careIdPk = modifyElements.careIdPk;
          sendPersonalElements = JSON.stringify(sendPersonalElements);
          dispatch(executeModal(false));
          dispatch(changeCareInfo(sendPersonalElements));
          dispatch(modifyElement(null));
        }
      confrimSweet("수정 하시겠습니까 ?", "확인을 누르시면 진행됩니다.","수정","성공적으로 수정되었습니다",doModifyCareInfo)
      };
      }else{
      dispatch(executeModal(false));
    }
  }else{dispatch(executeModal(false))};
  }
  // 간호기록 Create
  else if(getModalMode === 'careInfo-create'){
    modalTitle= 'Create CareInfo';
    treatData = ()=>{
      if(saveContent.current === ""){
        alertSweetError("잘못된 입력","빈값이 존재 합니다 확인 해주세요");
        }else{
          const doCreateCareInfo= () =>{
            sendPersonalElements.nurseName = userName;
            sendPersonalElements.careContent = saveContent.current;
            sendPersonalElements = JSON.stringify(sendPersonalElements);
            dispatch(executeModal(false));
            dispatch(setCareInfo(sendPersonalElements));
          }
          confrimSweet("등록 하시겠습니까 ?", "확인을 누르시면 진행됩니다.","등록","성공적으로 등록되었습니다",doCreateCareInfo)
      };
    };
  }
  // 처방기록 Update
  else if(getModalMode === 'medi-check-modify'){
    modalTitle= 'Modify Medicine Record';
    modalBtn = '수정';
    modalContentTitle = '처방 기록';
    if(modifyElements !=null){
      if(modifyElements.oderer === userName){
        ModalContentdefaultValue = modifyElements.orderContent;
        forthdefaultValue = modifyElements.medicineName;
        addInput = true;
        if(saveContent.current===""){
          saveContent.current= (modifyElements.orderContent);
        }
        if(saveForthContent.current === ""){
          saveForthContent.current=(modifyElements.medicineName);
        }
        treatData = ()=>{
          const doModifyMedicineRecord= () =>{
            sendPersonalElements.orderContent = saveContent.current;
            sendPersonalElements.recordIdPk = modifyElements.recordIdPk;
            sendPersonalElements.medicineName = saveForthContent.current;
            sendPersonalElements = JSON.stringify(sendPersonalElements);
            dispatch(executeModal(false));
            dispatch(changeMediRecord(sendPersonalElements));
            dispatch(modifyElement(null));
          }
        confrimSweet("수정 하시겠습니까 ?", "확인을 누르시면 진행됩니다.","수정","성공적으로 수정되었습니다",doModifyMedicineRecord)
          }
      }
      else{
        dispatch(executeModal(false));
      }
    }
    else{dispatch(executeModal(false))};
}

//처방기록 Create
else if(getModalMode === 'medi-check-create'){
    modalTitle= 'Create Medicine Record';
    modalContentTitle = '처방 기록';
    addInput = true;
    treatData = ()=>{
    if(saveContent.current === "" || saveForthContent.current === ""){
      alertSweetError("잘못된 입력","빈값이 존재 합니다 확인 해주세요");
    }else{
      const doCreateMedicineRecord= () =>{
        sendPersonalElements.oderer = userName;
        sendPersonalElements.oderContent =saveContent.current;
        sendPersonalElements.medicineName =saveForthContent.current;
        sendPersonalElements = JSON.stringify(sendPersonalElements);
        dispatch(executeModal(false));  
        dispatch(setMediRecord(sendPersonalElements));
      }
      confrimSweet("등록 하시겠습니까 ?", "확인을 누르시면 진행됩니다.","등록","성공적으로 등록되었습니다",doCreateMedicineRecord)
      }  
    };
  }
// 인계 사항 Update
  else if(getModalMode === 'handover-modify'){
    modalTitle= 'Modify HandOver';
    modalBtn = '수정';
    thirdTitle = '인계자';
    modalContentTitle = '인계 사항';
    literate =false;
    search = false;
    if(globalModifyElements !=null){
      if(globalModifyElements.empIdPk === getEmpId){
        thirdDefaultValue = globalModifyElements.handOverTarget;
        ModalContentdefaultValue = globalModifyElements.handOverContent;
        if(saveContent.current===""){
          saveContent.current= globalModifyElements.handOverContent;
          }
        if(saveThirdContent.current === ""){
            saveThirdContent.current= globalModifyElements.handOverTargetId;
          }else{
            saveThirdContent.current = inNurse.userName;
          }
        treatData = ()=>{
          if((saveThirdContent.current !== globalModifyElements.handOverTargetId && saveThirdContent.current !== inNurse.userName)){
              alertSweetError("잘못된 직원정보","검색을 다시하세요");
              saveThirdContent.current=globalModifyElements.handOverTargetId
          }
          else{
            if(saveThirdContent.current === ""){
              saveThirdContent.current = globalModifyElements.handOverTargetId
            }
            const doModifyHandover= () =>{
              sendElements ={
                "userName": getEmpId,
                "handOverTarget" : saveThirdContent.current,
                "handOverContent" : saveContent.current,
                "handOverPK" : globalModifyElements.handOverPK
                };
              sendElements = JSON.stringify(sendElements);
              dispatch(executeModal(false));
              dispatch(changeHandover(sendElements));
              dispatch(globalmodifyElement(null));
            }
            confrimSweet("수정 하시겠습니까 ?", "확인을 누르시면 진행됩니다.","수정","성공적으로 수정되었습니다",doModifyHandover)
          };
        };
      }
      else{
        dispatch(executeModal(false));
      }
  } 
  else{dispatch(executeModal(false))}
}
// 인계 사항 create  
  else if(getModalMode === 'handover-create'){
    modalTitle= 'Create HandOver';
    thirdTitle = '인계자';
    thirdDefaultValue = '';
    modalContentTitle = '인계 사항';
    literate =false;
    search = false;
    treatData = ()=>{
    if(saveContent.current === "" || saveThirdContent.current === ""){
      alertSweetError("잘못된 입력","빈값이 존재 합니다 확인 해주세요");
    }
    else if(inNurse.userName === ""){
      alertSweetError("잘못된 직원정보","검색을 다시하세요");
    }
    else{
      const doCreateHandover= () =>{
        sendElements ={
          "userName": getEmpId,
          "handOverTarget" : inNurse.userName,
          "handOverContent" : saveContent.current
        };
        sendElements = JSON.stringify(sendElements);
        dispatch(executeModal(false));
        dispatch(setHandOver(sendElements));
      }
      confrimSweet("등록 하시겠습니까 ?", "확인을 누르시면 진행됩니다.","등록","성공적으로 등록되었습니다",doCreateHandover)
    };  
  };
} 
// 해당 병동 전체 환자일정  Update  
  else if(getModalMode === 'schedule-modify'){
    modalTitle= 'Modify Schedule';
    modalBtn = '수정';
    thirdTitle = '위치';
    thirdDefaultValue = '';
    modalContentTitle = '일정 내용';
    literate =false;
    NewScheduleDate=false;
    if(globalModifyElements !=null){
        thirdDefaultValue = globalModifyElements.schedulePlace;
        ModalContentdefaultValue = globalModifyElements.scheduleContent;
        if(saveContent.current===""){
          saveContent.current= (globalModifyElements.scheduleContent);
          }
        if(saveThirdContent.current === ""){
            saveThirdContent.current=(globalModifyElements.schedulePlace);
          }
        if(saveScheduleDate.current === ""){
            saveScheduleDate.current=(globalModifyElements.scheduleDate);
          }
        treatData = ()=>{
          const doModifySchedule= () =>{
            sendElements ={
              "scheduleDate": saveScheduleDate.current,
              "schedulePlace" : saveThirdContent.current,
              "scheduleContent" : saveContent.current,
              "scheduleIdPk" : globalModifyElements.scheduleIdPk,
              "specialityName":specialityName,
              "LastModifier": getEmpName
              };
            let newdate = parseISO(saveScheduleDate.current);
            sendElements = JSON.stringify(sendElements);
            dispatch(executeModal(false));
            dispatch(changeSchedule(sendElements));
            dispatch(globalmodifyElement(null));
            dispatch(setStartDate(newdate));
          }
          confrimSweet("수정 하시겠습니까 ?", "확인을 누르시면 진행됩니다.","수정","성공적으로 수정되었습니다",doModifySchedule)
          }
        }
    else{dispatch(executeModal(false))}
  }
  //해당 병동 전체 환자일정  create 
  else if(getModalMode === 'schedule-create'){
    modalTitle= 'Create Schedule';
    modalContentTitle = '일정 내용';
    modalWriter= '환자 정보';
    thirdTitle = '위치';
    thirdDefaultValue = '';
    literate =false;
    NewScheduleDate = false;
    insertPatientInfo = false;
    
    treatData = ()=>{
    if(saveContent.current === "" || saveScheduleDate.current === ""
    ){
      alertSweetError("잘못된 입력","빈값이 존재 합니다 확인 해주세요");
    }
    else if((serachInPatient.current === "" || inPatientWard.name === "")){
      alertSweetError("잘못된 직원정보","검색을 다시하세요");
    }
    else{
      const doCreateSchedule= () =>{
        sendElements ={
          "name": inPatientWard.name,
          "ward" : inPatientWard.ward,
          "roomNum" : inPatientWard.roomNum,
          "bedNum" : inPatientWard.bedNum,
          "schedulePlace" : saveThirdContent.current,
          "scheduleContent" :  saveContent.current,
          "scheduleDate" : saveScheduleDate.current,
          "specialityName" : specialityName,
          "LastModifier": getEmpName
        };
        let newdate = parseISO(saveScheduleDate.current);
        sendElements = JSON.stringify(sendElements);
        dispatch(executeModal(false));
        dispatch(setInpatientSchedule(sendElements));
        dispatch(setStartDate(newdate));
      }
      confrimSweet("등록 하시겠습니까 ?", "확인을 누르시면 진행됩니다.","등록","성공적으로 등록되었습니다",doCreateSchedule)
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
                {insertPatientInfo ? 
                <fieldset>
                    <h5>{modalWriter}</h5>
                    <input id ='searchPatientInput' type="text" tabindex="2" readOnly value={getEmpName}/>
                </fieldset> 
                    :
                <fieldset>
                  <h5>{modalWriter}</h5>
                      <input id ='searchPatientInput' type="text" tabindex="3" placeholder= '환자명을 검색하세요' defaultValue={inPatientWard.name} onChange={(e)=>serachInPatient.current=(e.target.value)}/>
                      <div id="searchPatientInput-container">
                          <ul id="searchPatientInput-list"></ul>
                        </div>
                </fieldset> 
                    }
                
                {literate ? <fieldset>
                    <h5>{thirdTitle}</h5>
                    <input id ='searchInput' type="text" tabindex="3" readOnly value={selectPeople.name}/>
                </fieldset> :
                ( search ?
                <fieldset>
                    <h5>{thirdTitle}</h5>
                    <input id ='searchInput' clsss ="thirdPlace" type="text" tabindex="3" placeholder= {thirdDefaultValue} defaultValue={thirdDefaultValue} onChange={(e)=>saveThirdContent.current=(e.target.value)}/>
                </fieldset>
                : 
                <fieldset>
                    <h5>{thirdTitle}</h5>
                    <input id ='searchInput' type="text" tabindex="3" placeholder={thirdDefaultValue} defaultValue={inNurse.name} onChange={(e)=>saveThirdContent.current=(e.target.value)}/>
                    <div id="suggestions-container">
                      <ul id="suggestions-list"></ul>
                    </div>
                </fieldset>
                  )}
                {addInput && <fieldset>
                    <h5>약 종류</h5>
                    <input type="text" defaultValue={forthdefaultValue} tabindex="4" onChange={(e)=>saveForthContent.current=e.target.value}/>
                </fieldset>}
                <fieldset>
                    <h5>{modalContentTitle}</h5>
                    <textarea defaultValue= {ModalContentdefaultValue} tabindex="5" required onChange={(e)=>saveContent.current= e.target.value}></textarea>
                </fieldset>
                <fieldset>
                  <button name="submit" type="btn" id="contact-submit" onClick={treatData}>{modalBtn}</button>
                </fieldset>
            </div>
        </div>
    </div>
      )
}

export default WardMangementModal;