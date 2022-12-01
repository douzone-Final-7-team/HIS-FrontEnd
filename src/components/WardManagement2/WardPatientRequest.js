import React, { useEffect, useState } from 'react'
// style
import './wardPatientRequest.scss';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

//soket.io
import io from 'socket.io-client';
import axios from 'axios';

const socket = io.connect('http://localhost:3001')
// const name = window.localStorage.getItem('name');
const specialityName = window.localStorage.getItem('specialityName');


const WardPatientRequest = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [sendChangeReqStat ,setSendChangeReqStat] =useState()

  let updateNurseReq ;
  const handleClick = (e) => {        
   updateNurseReq = {
      callTime : new Date(new Date().getTime() - (new Date().getTimezoneOffset() * 60000)).toISOString().slice(0, 19).replace('T', ' ') ,
      ward : messageList[e.target.id].ward,
      roomNum : messageList[e.target.id].roomNum,
      bedNum : messageList[e.target.id].bedNum,
      specialityName:specialityName
    }

    setSendChangeReqStat(updateNurseReq);

    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleStatus = (e)=>{

    setSendChangeReqStat(sendChangeReqStat.callStatus = e.target.id)
    
    updateNurseReq = JSON.stringify(sendChangeReqStat)

    axios.put('http://localhost:9090/admission/InPatientReq',
          updateNurseReq,
        {
          headers: {
            "Content-Type" : `application/json`,
          },
        }).then(res=> setMessageList(res.data))
   
  };


  const [messageList , setMessageList] = useState([])

  const [room, setRoom] = useState("");

  useEffect(()=>{
    axios.post('http://localhost:9090/admission/allInPatientReqs',
    {specialityName:specialityName},
        {
          headers: {
            "Content-Type" : `application/json`,
          },
        }).then(res=> setMessageList(res.data))

  },[])

    useEffect(()=>{
      setRoom(specialityName)

      if (room !== "") {
        // 프론트에서 백엔드로 데이터 방출 join_room id로 백에서 탐지 가능
        // 2번째 인자인 room은 방이름이며 백에선 data매게변수로 받는다
        socket.emit("join_room", room);
    }
    },[room])


    useEffect(()=>{
      socket.on("call_message", (data)=>{
        setMessageList((list)=>[data, ...list])
      })

    },[])


  return (
    
    <div className='reduced-patient-status' id = 'text22'>
      <p className='section-title'>환자 호출</p>
      <div className='line'></div>
      <p className='filtering'><span>총 호출 수({messageList.length})</span></p>
      <div className='status-wrapper' >
        {messageList.map((callContent,index)=>(
          <div className='waiting-order'
          key ={index}
          id={index}
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onContextMenu={handleClick}
        >
            <p className='waiting-name'>
              {callContent.patientName}
              <span className='medical-hours'>{(callContent.callTime)}</span>
              <span className='medical-hours'>{callContent.ward*1 + callContent.roomNum*1}호실</span>
            </p>
          <p className='status-value'>{callContent.callStatus}</p>
        </div>
        ))}
          <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
          style={{left:"350px" , top:"-20px"}}
        >
          <MenuItem id="확인" onClick={(e)=>{handleClose(); handleStatus(e);}}>확인</MenuItem>
          <MenuItem id="완료" onClick={(e)=>{handleClose(); handleStatus(e);}}>완료</MenuItem>
        </Menu>
      </div>
    </div>
  )
}

export default WardPatientRequest;
