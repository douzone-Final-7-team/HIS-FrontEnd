import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getReceiveHandOver, getSendHandOver } from '../../redux/AdmissionPatientInfoApi';
// style
import './handOver.scss';

const HandOver = () => {
  const dispatch = useDispatch();

    // 시큘리티 마무리 되면 userID얻어서 저장
  let user = {
    "userName" : "wjdgus"
  }

  let handOverElement = JSON.stringify(user)
  
  const [radioChecked, setRadioChecked] =useState(true);

  const ToHandOver = () =>{
    dispatch(getReceiveHandOver(handOverElement));
    setRadioChecked(!radioChecked)
  }
  const FromHanover = () =>{
     dispatch(getSendHandOver(handOverElement));
     setRadioChecked(!radioChecked)
   }

  const HandOverInfo = useSelector(state=>{
    return state.outPatientInfo.value[6]
  })

  console.log(HandOverInfo);

  return (
    <div className='handOver-container'>
      <div className='checkBox-container'>
        <div onClick={ToHandOver}>
          <input type='radio' name ='handover-radio' checked={radioChecked} ></input><span>TO ME</span>
        </div>
        <div onClick={FromHanover}>
        <input type='radio' name ='handover-radio' checked={!radioChecked}/><span>FROM ME</span>
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
              {HandOverInfo != null &&
              HandOverInfo.map((HandOverInfo, index)=>(
                <tr key = {index}>
                <td className='handOver-fix'><input type= "radio" name= "handOver"/></td>
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
        <a href='#!' className='btn'>수정</a> 
        <a href='#!' className='btn'>등록</a>
      </div>
    </div>
  )
}

export default HandOver ;
