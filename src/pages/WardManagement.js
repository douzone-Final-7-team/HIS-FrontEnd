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

  useEffect(()=>{
    setTimeout(() => 
    axios.get(API_URL+"/AdmissionFront/bedInfo")
         .then(res => setWardData(res.data)),
    axios.get(API_URL+"/AdmissionFront/available_room")
         .then(res => setAvailable(res.data))
    ,70);
  },[bedInfo]);

  // console.log("bedInfobedInfobedInfobedInfo:"+bedInfo);
  // console.log("와라라락:"+ (available!=null)&& (available));

  return (
    <div className='ward-management'>
      <main className='main'>
        <div className='top'>
          <EmpBar />
        </div>
        
        <div className='bed-count'>
          <p className='count-title'>총 병상수</p>
          <p className='count'>&gt; <span>{wardData[0].totalBed}</span></p>
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
            <a href='#!'className='btn'>가용병상</a>
            <div className='dropdown-submenu'>
              <div className='dropdown-box'>
                <table className='dropdown-table'>
                <thead>
                  
                  {available.map((availableWardRoom,index) => (
                    <ul>
                      <li>
                        <td>{availableWardRoom.available_room}</td>
                      </li>
                    </ul>
                  ))}
                    
                  </thead>
                    {/* <tr>
                      <th>진료 일자</th>
                      <th>진단명</th>
                      <th>처방 및 치료 내역</th>
                    </tr>
                    <tr>
                      <th>하하</th>
                      <th>호호</th>
                      <th>후후</th>
                    </tr> */}
                  
                </table>
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
        <WardCheck />
        <div className='tab'>
          <AdmissionSunab bedInfo={bedInfo} setBedInfo = {setBedInfo}/>
        </div>
      </main>
    </div>

  )
}

export default WardManagement;
