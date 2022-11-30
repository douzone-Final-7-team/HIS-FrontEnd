import React, { useEffect, useState } from 'react'
// style
import '../styles/scss/reset.scss';
import'../styles/wardPatientCall.scss';
// components
import InPatientBar from '../components/inPatient/InPatientBar';


import io from 'socket.io-client';
import axios from 'axios';
const socket = io.connect('http://localhost:3001')


const WardPatientCall = () => {
  
  const [room, setRoom] = useState("");

    useEffect(()=>{
      setRoom("내과")
      if (room !== "") {
        // 프론트에서 백엔드로 데이터 방출 join_room id로 백에서 탐지 가능
        // 2번째 인자인 room은 방이름이며 백에선 data매게변수로 받는다
        socket.emit("join_room", room);
    }
    },[room])

    const sendData = async() => {
      let callTime = new Date()
      const messageData = {
        room: room,
        patientName: "배병서",
        callTime: callTime.getHours() + ":" + callTime.getMinutes() + ":" + callTime.getSeconds(),
        callStatus : "",
        ward: 200,
        roomNum: 1,
        bedNum: 1
      };

      const savemassage = {
        callTime: new Date(new Date().getTime() - (new Date().getTimezoneOffset() * 60000)).toISOString().slice(0, 19).replace('T', ' ') ,
        callStatus : "호출",
        ward: 200,
        roomNum: 1,
        bedNum: 1
      }

      await socket.emit("send_message", messageData )

    axios.put('http://localhost:9090/admission/InPatientReq',
      savemassage,
        {
          headers: {
            "Content-Type" : `application/json`,
          },
        }).then(res=> console.log(res.data))

  }
  return (
    <div className='WardPatientCall-wapper'>
      <main className='WardPatientCall-container'>
        <div className='top'>
          <InPatientBar />
        </div>
        <div className='btn-wapper' >
        <a href='#!' className='btn' id='handover-modify' onClick={sendData}>호출</a> 
      </div>
      </main>

    </div>
  );
}

export default WardPatientCall;
