import React, { useEffect, useState } from 'react'
// style
import './patientStatus.scss';
// component
import DetailedStatus from './DetailedStatus';
import axios from 'axios';
import './detailedStatus.scss';

function PatientStatus({outStatusReRender, setOutStatusReRender}) {

  const [speciality, setSpeciality] = useState('내과');
  const [patientStatus, setPatientStatus] = useState();
  const data = ['전체', '대기중', '진료중', '치료', '완료'];
  const [btnActive, setBtnActive] = useState(0);


  useEffect(()=>{
    axios.post("http://localhost:9090/outStatus/getdocpat", {
      SPECIALITY_ID_FK: (speciality === '내과' ? 'N' : speciality === '이비인후과' ? 'E' : speciality === '정형외과' ? 'J' : ' ')
      }).then((res)=>{
        setPatientStatus(res.data)
      });
  },[speciality]);

  useEffect(()=>{
    axios.post("http://localhost:9090/outStatus/getdocpat", {
      SPECIALITY_ID_FK: (speciality === '내과' ? 'N' : speciality === '이비인후과' ? 'E' : speciality === '정형외과' ? 'J' : ' ')
      }).then((res)=>{
        setPatientStatus(res.data);
        setOutStatusReRender(()=>true);
      });
  },[outStatusReRender, setOutStatusReRender, speciality]);

  
  return (
    <div className='patient-status'>
      <div>
        <p className='section-title'>환자현황</p>
        <select className='filter' onChange={(e) => {
                setSpeciality(e.target.value);
              }}>
          <option>내과</option>
          <option>이비인후과</option>
          <option>정형외과</option>
        </select>
      </div>
      <div className='status'>
        <p>
        {data.map((item, idx) => {
        return (
          <span key={idx}>
            <button
              value={idx}
              className={"btn" + (idx === parseInt(btnActive) ? " active" : "")}
              onClick={(e) => {
                setBtnActive(() => {
                  return (e.target.value);
                });
                if(idx === 0) {
                  axios.post("http://localhost:9090/outStatus/getdocpat", {
                    SPECIALITY_ID_FK: (speciality === '내과' ? 'N' : speciality === '이비인후과' ? 'E' : speciality === '정형외과' ? 'J' : ' ')
                    }).then((res)=>{setPatientStatus(res.data)});
                } else if (idx === 1) {
                  axios.post("http://localhost:9090/outStatus/getdocpatCon", {
                    SPECIALITY_ID_FK: (speciality === '내과' ? 'N' : speciality === '이비인후과' ? 'E' : speciality === '정형외과' ? 'J' : ' '),
                    OUTPATIENT_STATUS_CODE: 'OC'
                  }).then((res)=>{setPatientStatus(res.data)});
                } else if (idx === 2) {
                  axios.post("http://localhost:9090/outStatus/getdocpatCon", {
                    SPECIALITY_ID_FK: (speciality === '내과' ? 'N' : speciality === '이비인후과' ? 'E' : speciality === '정형외과' ? 'J' : ' '),
                    OUTPATIENT_STATUS_CODE: 'OA'
                  }).then((res)=>{setPatientStatus(res.data)});
                } else if (idx === 3) {
                  axios.post("http://localhost:9090/outStatus/getdocpatCon", {
                    SPECIALITY_ID_FK: (speciality === '내과' ? 'N' : speciality === '이비인후과' ? 'E' : speciality === '정형외과' ? 'J' : ' '),
                    OUTPATIENT_STATUS_CODE: 'OB'
                  }).then((res)=>{setPatientStatus(res.data)});
                } else if (idx === 4) {
                  axios.post("http://localhost:9090/outStatus/getdocpatCon", {
                    SPECIALITY_ID_FK: (speciality === '내과' ? 'N' : speciality === '이비인후과' ? 'E' : speciality === '정형외과' ? 'J' : ' '),
                    OUTPATIENT_STATUS_CODE: 'OD'
                  }).then((res)=>{setPatientStatus(res.data)});
                }
              }}
            >
              {item}
            </button>
          </span>
        );
      })}</p>
        <div>
          {patientStatus!==null && patientStatus!==undefined? patientStatus.map((data, index) => (
            <DetailedStatus key={index} data={data} index={index}/>
          )):""}
        </div>
      </div>
    </div>
  )
}

export default PatientStatus;
