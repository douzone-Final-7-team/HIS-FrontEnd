import React, { useEffect, useRef, useState } from 'react'
// style
import './patientStatus.scss';
// component
import DetailedStatus from './DetailedStatus';
import axios from 'axios';
import './detailedStatus.scss';
import io from 'socket.io-client';

const socket = io.connect('http://192.168.0.195:3001');

function PatientStatus({ outStatusReRender, setOutStatusReRender }) {

  const [patientStatus, setPatientStatus] = useState();
  const data = ['전체', '대기중', '진료중', '치료', '완료'];
  const [btnActive, setBtnActive] = useState(0);

  const [room, setRoom] = useState("");
  const [ren, setRen] = useState("")
  const speciality = useRef('내과');
  const statusCode = useRef(null);


  useEffect(() => {
    setRoom("out")

    if (room !== "") {
      // 프론트에서 백엔드로 데이터 방출 join_room id로 백에서 탐지 가능
      // 2번째 인자인 room은 방이름이며 백에선 data매게변수로 받는다
      socket.emit("join_room", room);
    }
  }, [room])

  useEffect(() => {
    speciality.current = localStorage.getItem('speciality')? localStorage.getItem('speciality'):'내과';
    statusCode.current = localStorage.getItem('statusCode')? localStorage.getItem('statusCode'):null;
    axios.post("http://192.168.0.195:9090/outStatus/getdocpatCon", {
      SPECIALITY_ID_FK: (speciality.current === '내과' ? 'N' : speciality.current === '이비인후과' ? 'E' : speciality.current === '정형외과' ? 'J' : ' '),
      OUTPATIENT_STATUS_CODE: statusCode.current
    }).then((res) => {
      
      setPatientStatus(res.data);
      setRen(2);
      if (localStorage.getItem('role') === 'ROLE_OUTRECEIPT') { setOutStatusReRender(() => true); }
    });
  }, [outStatusReRender, setOutStatusReRender, ren])


  setTimeout(() =>
    socket.on("receipt_render", () =>
      axios.post("http://192.168.0.195:9090/outStatus/getdocpatCon", {
        SPECIALITY_ID_FK: (speciality.current === '내과' ? 'N' : speciality.current === '이비인후과' ? 'E' : speciality.current === '정형외과' ? 'J' : ' '),
        OUTPATIENT_STATUS_CODE: statusCode.current
      }).then((res) => {
        setPatientStatus(res.data);
        setOutStatusReRender(() => true);
      })), 50)

  //여기서 on을 받는다.


  setTimeout(() =>
    socket.on("sunab_render", () =>
      axios.post("http://192.168.0.195:9090/outStatus/getdocpatCon", {
        SPECIALITY_ID_FK: (speciality.current === '내과' ? 'N' : speciality.current === '이비인후과' ? 'E' : speciality.current === '정형외과' ? 'J' : ' '),
        OUTPATIENT_STATUS_CODE: statusCode.current
      }).then((res) => {
        setPatientStatus(res.data);
        setOutStatusReRender(() => true);
      })), 50)



  setTimeout(() =>
    socket.on("doctor_render", () =>
      axios.post("http://192.168.0.195:9090/outStatus/getdocpatCon", {
        SPECIALITY_ID_FK: (speciality.current === '내과' ? 'N' : speciality.current === '이비인후과' ? 'E' : speciality.current === '정형외과' ? 'J' : ' '),
        OUTPATIENT_STATUS_CODE: statusCode.current
      }).then((res) => {
        setPatientStatus(res.data);
        setOutStatusReRender(() => true);
      })), 50)



  setTimeout(() =>
    socket.on("change_state", () => {
      axios.post("http://192.168.0.195:9090/outStatus/getdocpatCon", {
        SPECIALITY_ID_FK: (speciality.current === '내과' ? 'N' : speciality.current === '이비인후과' ? 'E' : speciality.current === '정형외과' ? 'J' : ' '),
        OUTPATIENT_STATUS_CODE: statusCode.current
      }).then((res) => {
        setPatientStatus(res.data);
        setOutStatusReRender(() => true);
      })
    }), 50)




  return (
    <div className='patient-status'>
      <div>
        <p className='section-title'>환자현황</p>
        <select className='filter' onChange={(e) => {
          localStorage.setItem('speciality', e.target.value);
          setRen(1)
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
                    if (idx === 0) { localStorage.removeItem('statusCode'); setRen(1) } else if (idx === 1) { localStorage.setItem('statusCode', 'OC'); setRen(1) } else if (idx === 2) { localStorage.setItem('statusCode', 'OA'); setRen(1) }
                    else if (idx === 3) { localStorage.setItem('statusCode', 'OB'); setRen(1) } else if (idx === 4) { localStorage.setItem('statusCode', 'OE'); setRen(1) }
                  }}
                >
                  {item}
                </button>
              </span>
            );
          })}</p>
        <div>
          {patientStatus !== null && patientStatus !== undefined ? patientStatus.map((data, index) => (
            <DetailedStatus key={index} data={data} index={index} setPatientStatus={setPatientStatus} />
          )) : ""}
        </div>
      </div>
    </div>
  )
}

export default PatientStatus;
