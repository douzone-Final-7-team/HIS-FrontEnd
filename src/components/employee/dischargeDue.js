import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { API_URL } from '../../utils/constants/Config';
import './dischargeDue.scss';
import io from 'socket.io-client';
import { alertSweetError, alertSweetSuccess } from '../higher-order-function/Alert';


const socket = io.connect('http://192.168.0.195:3001');

const InitList = () => {return (
    <div className='discharge-Due-small-square'>
        <ul>
            <li>
                <p className='init-due-position'>
                    <span>금일 퇴원예정자가 없습니다.</span> 
                </p>
            </li>
        </ul>
    </div>
)
}


const DischargeDue = ({setBedInfo , bedInfo}) => {
    const [disChargeDueList, setDisChargeDueList] = useState([]);
    const [disChargeFinish, setDisChargeFinish] = useState(false);
    const [socketRoom, setSocketRooom] = useState("");

    useEffect(()=>{
      setSocketRooom("입원")
    if (socketRoom !== "") {
      socket.emit("join_room", socketRoom);
  }
  },[socketRoom])

    useEffect(()=>{
        setTimeout(() => 

        axios.get(API_URL+"/AdmissionFront/dischargelist")
            .then(res => setDisChargeDueList(res.data))
            , 50);
        // console.log("퇴원재랜더");
    },[disChargeFinish]);

    // useEffect(() => {
    //     const timer = setTimeout(() => console.log('Initial timeout!')
    //   }, []);

    console.log(disChargeDueList);
    console.log(disChargeFinish);

    function completeAfter(){

        let changeState = disChargeFinish;
        if(changeState === false){
            changeState = true;
            
        }else if(changeState === true){
            changeState = false;
        }

        let bedInfoState = bedInfo;
        if(bedInfoState === false){
            bedInfoState = true;
            
        }else if(bedInfoState === true){
            bedInfoState = false;
        }

        setDisChargeFinish(()=>changeState);
        setBedInfo(()=>bedInfoState);
    }

    async function complete(admissionIdPk,WARDROOM,BED_NUM) {
        const messageData={
            admission : socketRoom
        }

        await socket.emit("send_admissionOrder", messageData );

        let ward = (WARDROOM+"").substring(0,1)*100;
        let room = (WARDROOM+"").substring(2);

        let data = {ADMISSION_ID_PK: admissionIdPk,
                     WARD : ward,
                     ROOM_NUM : room,
                     BED_NUM : BED_NUM
                    };

        axios.put(API_URL+"/AdmissionFront/discharged", JSON.stringify(data), {headers:{"Content-Type" : `application/json`},})
        .then((res) => {res.data==="success"? alertSweetSuccess("승인","퇴원이 완료되었습니다.",completeAfter):alertSweetError("거부","퇴원처리에 실패하였습니다.");
            }); 
    }
        
    
    const DisChargeListData = ()=>{return(disChargeDueList.map((v,index) => (
                                                                    
                                                                    <div className='discharge-Due-small-square'  key={v.index}>
                                                                        <ul className='ul-tag'>
                                                                            <li>
                                                                                <p className='due-position'>
                                                                                    <span className='a'>{v.PATIENT_NAME}</span>
                                                                                    <span className='b'>{v.GENDER} / {v.AGE}</span>
                                                                                    <span className='c'>{v.PATIENT_SSN}</span>
                                                                                    <span className='d'>{v.DOW}</span>
                                                                                    <span className='e'>15:00</span>
                                                                                    <span className='f'>{v.WARDROOM}호 {v.BED_NUM}실</span>
                                                                                    <input type='hidden' value={index}/>
                                                                                    {v.ADMISSION_STATUS_CODE === "IE" ? <input className='g complete'type='button' value = "퇴실완료" onClick={() => {complete(v.ADMISSION_ID_PK,v.WARDROOM,v.BED_NUM)}}/>: v.ADMISSION_STATUS_CODE === "IG" ? <input className='g not-payment'type='button' value = "연체환자"/>:<input className='g un-complete'type='button' value = "미수납"/>}
                                                                                </p>
                                                                            </li>
                                                                        </ul>
                                                                    </div>
                                                                )))}

    


    return (
        <div className='discharge-Due-wapper'>
            <div className='discharge-Due-big-square'>
                {disChargeDueList.length !== 0 ? <DisChargeListData/>: <InitList/>}
                
            </div>
        </div>
    )
}

export default DischargeDue