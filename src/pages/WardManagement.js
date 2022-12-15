import React, { useState ,useEffect } from 'react'

// style
import '../styles/scss/reset.scss';
import '../styles/wardManagement.scss';
// components
import EmpBar from '../components/employee/EmpBar';
import WardCheck from '../components/patient/WardCheck';
import AdmissionSunab from '../components/employee/admissionSunab';
import axios from 'axios';
import { API_URL } from '../utils/constants/Config';
import io from 'socket.io-client';


const socket = io.connect('http://192.168.0.195:3001')


const WardManagement = () => {

  const [wardData, setWardData] = useState([{
    totalBed : "",
    outDuePatient: "", 
    usingBed: "", 
    unusingBed: ""
  }]);

  const [available , setAvailable] = useState([]);

  useEffect(()=>{
    axios.put(API_URL+"/AdmissionReceipt/changeStateList")
    .then(console.log("update완료"));
  },[]);


    

  const [bedInfo, setBedInfo] = useState(false);
  const [selectRoom, setSelectRoom] = useState("");
  const [test,setTest] = useState("");
  const [room, setRoom] = useState("");
  

  useEffect(()=>{
      setRoom("입원")
    if (room !== "") {
      // 프론트에서 백엔드로 데이터 방출 join_room id로 백에서 탐지 가능
      // 2번째 인자인 room은 방이름이며 백에선 data매게변수로 받는다
      socket.emit("join_room", room);
  }
  },[room])

    let bedInfoState = bedInfo;
    socket.on("bedInfoChange",(data)=>{
       if(!bedInfoState){
          bedInfoState = true;
        }else{
          bedInfoState = false;
        }
        setBedInfo(()=>bedInfoState);})

  useEffect(()=>{
    setTimeout(() => 
    axios.get(API_URL+"/AdmissionFront/bedInfo")
         .then(res => setWardData(res.data)),
    axios.get(API_URL+"/AdmissionFront/available_room")
         .then(res => setAvailable(res.data))
    ,70);
  },[bedInfo]);

  console.log(available);
  let secondWard = [];
  let thirdWard = [];
  let fourthWard = [];

  for(var i = 0; i<available.length; i++){
    let wardNum = (available[i].available_room)+""
    if(wardNum.substring(0,1)==="2"){
      secondWard.push({available_room:available[i].available_room , unusing_bed_count:available[i].unusing_bed_count});
    }else if(wardNum.substring(0,1)==="3"){
      thirdWard.push({available_room:available[i].available_room , unusing_bed_count:available[i].unusing_bed_count});
    }else if(wardNum.substring(0,1)==="4"){
      fourthWard.push({available_room:available[i].available_room , unusing_bed_count:available[i].unusing_bed_count});
    }

  }
  

  return (
    <div className='ward-management'>
      <main className='main'>
        <div className='top'>
          <EmpBar />
        </div>
        
        <div className='bed-count'>
          <p className='count-title'>총 병상수</p>
          <p className='count'>&gt; <span>{wardData[0].totalBed}</span></p>
          {/* <button onClick={()=>open()}>가용병상</button> */}
          <div className='line'></div>
        </div>
        <div className='bed-count'>
          <p className='count-title'>가동 병상수</p>
          <p className='count'>&gt; <span>{wardData[0].usingBed}</span></p>
          <div className='line'></div>
        </div>
        <div className='bed-count'>
          <p className='count-title'>빈 병상수</p>
          <p className='count'>&gt; <span>{wardData[0].unusingBed}</span></p>
          <div className='dropdown'>
            <a href='#!' className='btn'>가용병상</a>
            <div className='dropdown-submenu'>
              <div className='dropdown-box'>
                <div className='dropdown-table'>
                
                  <div className='a'>
                    {secondWard.map((data)=>(
                      <li><td>{data.available_room}호 : {data.unusing_bed_count}</td></li>
                    ))}
                  </div>
                  
                  <div className='b'>
                    {thirdWard.map((data)=>(
                      <li><td>{data.available_room}호 : {data.unusing_bed_count}</td></li>
                    ))}
                  </div>

                  <div className='c'>
                    {fourthWard.map((data)=>(
                      <li><td>{data.available_room}호 : {data.unusing_bed_count}</td></li>
                    ))}
                  </div>
                  
                

                </div>
              </div>
            </div>
          </div>
            


          <div className='line'></div>
        </div>
        <div className='bed-count'>
          <p className='count-title'>금일 퇴원예정자</p>
          <p className='count'>&gt; <span>{wardData[0].outDuePatient}</span></p>
          <div className='line'></div>
        </div>
        <WardCheck bedInfo={bedInfo} setTest={setTest} setSelectRoom={setSelectRoom}/>
        <div className='tab'>
          <AdmissionSunab test={test} setTest={setTest} selectRoom={selectRoom} setSelectRoom={setSelectRoom} bedInfo={bedInfo} setBedInfo = {setBedInfo}/>
        </div>
      </main>
      
      
    </div>

  );
};

export default WardManagement;
