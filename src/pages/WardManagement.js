import React, { useState ,useEffect } from 'react'
// import API_URL from '../utils/constants/Config'

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
  useEffect(()=>{
    axios.get(API_URL+"/AdmissionFront/test")
         .then(res => setWardData(res.data));
  },[]);

  
  // admission/roominfos




  // console.log(wardData[0].totalBed);

  
  


  // let data = {admissionIdPk : "A22000011"};
  // axios.post("http://localhost:9090/AdmissionReceipt/AdReceipt", JSON.stringify(data), {headers: {"Content-Type" : "application/json"}})
  // .then(res => {console.log(res)})

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
          {/* {wardData[0].length > 0 ? <div className='line'>{wardData[0].totalBed}</div> : <div className='line'></div>} */}
        </div>
        <div className='bed-count'>
          <p className='count-title'>가동 병상수</p>
          <p className='count'>&gt; <span>{wardData[0].usingBed}</span></p>
          <div className='line'></div>
        </div>
        <div className='bed-count'>
          <p className='count-title'>빈 병상수</p>
          <p className='count'>&gt; <span>{wardData[0].unusingBed}</span></p>
          <div className='btn'>가용병상</div>
          <div className='line'></div>
        </div>
        <div className='bed-count'>
          <p className='count-title'>금일 퇴원예정자</p>
          <p className='count'>&gt; <span>{wardData[0].outDuePatient}</span></p>
          <div className='line'></div>
        </div>
        <WardCheck />
        <div className='tab'>
          <AdmissionSunab />
        </div>
      </main>
    </div>

  )
}

export default WardManagement;
