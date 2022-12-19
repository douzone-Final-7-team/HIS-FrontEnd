import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getReceiveHandOver, getSendHandOver } from '../../redux/AdmissionPatientInfoApi';
import {executeModal, globalmodifyElement, modalMode, setRadioChecked} from '../../redux/InPatientInfoSlice';
// style
import './handOver.scss';

const HandOver = () => {
  const dispatch = useDispatch();
  const ModalMode = (e)=>{
    let selectMode = e.target.id
    dispatch(executeModal(true));
    dispatch(modalMode(selectMode));
    let handOverCheck=document.getElementsByName("handOver");
    for(let i =0; i < handOverCheck.length ; i++){
      if(handOverCheck[i].checked){
        handOverCheck[i].checked =false;
      };
    };
  };

  const empIdPk = window.localStorage.getItem('empIdPk');
  let user = {
    "userName" : empIdPk
  };

  let handOverElement = JSON.stringify(user);

  // const [radioChecked, setRadioChecked] =useState(true);
  const radioChecked = useSelector(state=>{
    return state.inPatientInfo.value[10]
  });

  const ToHandOver = () =>{
    dispatch(getReceiveHandOver(handOverElement));
    dispatch(setRadioChecked(!radioChecked));
    let handOverCheck=document.getElementsByName("handOver");
    for(let i =0; i < handOverCheck.length ; i++){
      if(handOverCheck[i].checked){
        handOverCheck[i].checked =false;
      };
    };
  };

  const FromHanover = () =>{
     dispatch(getSendHandOver(handOverElement));
     dispatch(setRadioChecked(!radioChecked));
     let handOverCheck=document.getElementsByName("handOver");
    for(let i =0; i < handOverCheck.length ; i++){
      if(handOverCheck[i].checked){
        handOverCheck[i].checked =false;
      };
    };
   };

  const handOverInfo = useSelector(state=>{
    return state.inPatientInfo.value[9]
  });

  const selectRow = (e)=>{
    let changeHandOverInfo = {
      handOverPK : handOverInfo[e.target.id].HANDOVER_ID_PK,
      handOverContent : handOverInfo[e.target.id].HANDOVER_CONTENT,
      handOverTarget:handOverInfo[e.target.id].HANDOVER_TARGET,
      empIdPk: handOverInfo[e.target.id].EMP_ID_FK,
      handOverTargetId: handOverInfo[e.target.id].targetEMP_ID_FK
    };
    dispatch(globalmodifyElement(changeHandOverInfo));
  };


  return (
    <div className='handOver-container'>
      <div className='checkBox-container'>
        <div id='handover-radio1' onClick={ToHandOver}>
          <input type='radio' name ='handover-radio' checked={radioChecked} readOnly></input><span>TO ME</span>
        </div>
        <div id='handover-radio2' onClick={FromHanover}>
        <input type='radio' name ='handover-radio' checked={!radioChecked} readOnly /><span>FROM ME</span>
        </div>
      </div>
        <div className='handOver-wapper'>
          <table>
            <thead>
              <tr>
                <th>-</th>
                <th>날짜</th>
                <th>작성자</th>
                <th>인계자</th>
                <th>인계 사항</th>
              </tr> 
            </thead>
            <tbody>
              {handOverInfo.map((HandOverInfo, index)=>(
              <tr key ={index}>
                <td className='handOver-fix'><input type= "radio" name= "handOver" id = {index} onClick={selectRow}/></td>
                <td className='handOver-date'>{(HandOverInfo.HANDOVER_DATE + " ").substring(0,10)}</td>
                <td className='handOver-from' >{HandOverInfo.EMP_NAME}</td>
                <td className='handOver-to'>{HandOverInfo.HANDOVER_TARGET}</td>
                <td className='handOver-content'>{HandOverInfo.HANDOVER_CONTENT}</td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
      <div className='btn-wapper' >
        <a href='#!' className='btn' id='handover-modify' onClick={ModalMode}>수정</a> 
        <a href='#!' className='btn' id='handover-create' onClick={ModalMode}>등록</a>
      </div>
    </div>
  )
}

export default HandOver ;
