import React, { useState,useEffect } from 'react'
import io from 'socket.io-client';
import { useDispatch, useSelector } from 'react-redux'
import { changeOutpatientStatus } from '../../redux/OutpatientPageInfoApi';
import axios from 'axios';

const SPECIALITY_ID_FK = 'N';//localStorage.getItem('specialityId') || '';

const socket = io.connect('http://192.168.0.195:3001');

const TreatmentOrder = ({ patientDetails }) => {
  /*-소켓-*/
  const [room, setRoom] = useState("");

  useEffect(()=>{
    setRoom("out")

    if (room !== "") {
      // 프론트에서 백엔드로 데이터 방출 join_room id로 백에서 탐지 가능
      // 2번째 인자인 room은 방이름이며 백에선 data매게변수로 받는다
      socket.emit("join_room", room);
  }
  },[room])

  console.log(patientDetails)

  const dispatch = useDispatch();
  
  // 환자현황 : 환자 상태값
  const opStatusInfo = useSelector(state =>  state.checkOpStatusCode.value[2]);

  // 외래진료환자 상태 : 치료
  let onTreatmentStatus = false;
  //  외래진료환자 상태 : 수납완료
  let completionStatus = false;
  if(opStatusInfo === '치료') {
    onTreatmentStatus = true;
  } else if(opStatusInfo === '수납완료') {
    completionStatus = true;
  }


  
  // console.log();
  const receiveId =  patientDetails.RECEIVE_ID_PK;
  console.log(receiveId);
  console.log(SPECIALITY_ID_FK);
  const changePatientCode = () => {
    const opStatusCode = 'OD';
    // dispatch(changeOutpatientStatus({receiveId, opStatusCode})); 
    axios.post('http://192.168.0.195:9090/outStatus/putChangeState',
      {
        RECEIVE_ID_PK : receiveId,
        SPECIALITY_ID_FK : SPECIALITY_ID_FK,
        status : opStatusCode
      },
      {
        headers: {
          "Content-Type" : `application/json`,
        },
      })
      // .then(res=> {setPatientStatus(res.data)})

      let change;
      change = {outpatient : room,
                RECEIVE_ID_PK : receiveId,
                SPECIALITY_ID_FK : SPECIALITY_ID_FK,
                status : opStatusCode
                }
      socket.emit("click_change_state", change );

  }

  return (
    <div>
      <div id="tab-treatment-order">
        <p className="icon-title">
          <span className="icon">&gt;</span><span className="task-title">치료오더</span>
        </p>
        <table className='styled-table'>
          <thead>
            <tr>
              <th>체크</th>
              <th>처방내역</th>
              <th>비고</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{completionStatus === true ? <input type="checkbox" checked/> : <input type="checkbox"/>}</td>
              {patientDetails!==null && patientDetails!==undefined ?
              <td>{patientDetails.TREATMENT_ORDER}</td>
              :
              <td></td>}
              <td>-</td>
            </tr>
          </tbody>
        </table>
        {onTreatmentStatus === true ? <p className='btn-tbl'><a href='#!' className='btn' onClick={changePatientCode}>완료</a></p> : ''}
      </div>
    </div>
  )
}

export default TreatmentOrder
