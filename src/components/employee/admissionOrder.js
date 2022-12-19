import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { API_URL } from '../../utils/constants/Config';
import './admissionOrder.scss';
import io from 'socket.io-client';
import { alertSweetError, alertSweetSuccess } from '../higher-order-function/Alert';


const socket = io.connect('http://192.168.0.195:3001')

const AdmissionOrder = ({bedInfo , setBedInfo}) => {

    const [admissionOrderList, setAdmissionOrderList] = useState([{
        ADMISSION_ID_PK : "",
        ADMISSION_DUEDATE : "",
        PATIENT_NAME : "",
        GENDER : "", 
        PATIENT_AGE : "" , 
        PATIENT_SSN : "",
        T_TIME : "",
        SPECIALITY_NAME : "",
        EMP_NAME : "",
        TREATMENT_MEMO : "",        
        WARD : ""
    }]);
    const [room, setRoom] = useState("");
    const [room2, setRoom2] = useState("");
    const [room3, setRoom3] = useState("");
    const [admissionFinish, setAdmissionFinish] = useState(false);
    const inputData = useRef("");

    useEffect(()=>{
        setRoom("입원")
      if (room !== "") {
        // 프론트에서 백엔드로 데이터 방출 join_room id로 백에서 탐지 가능
        // 2번째 인자인 room은 방이름이며 백에선 data매게변수로 받는다
        socket.emit("join_room", room);
    }
    },[room])

    useEffect(()=>{
        setRoom2("out") //=> 현재 부분에서 room 입장 두개하면 무한으로 입장된다.
      if (room2 !== "") {
        // 프론트에서 백엔드로 데이터 방출 join_room id로 백에서 탐지 가능
        // 2번째 인자인 room은 방이름이며 백에선 data매게변수로 받는다
        socket.emit("join_room", room2);
    }
    },[room2]);

    useEffect(()=>{
        setRoom3("admission") //=> 현재 부분에서 room 입장 두개하면 무한으로 입장된다.
      if (room3 !== "") {
        // 프론트에서 백엔드로 데이터 방출 join_room id로 백에서 탐지 가능
        // 2번째 인자인 room은 방이름이며 백에선 data매게변수로 받는다
        socket.emit("join_room", room3);
    }
    },[room3]);

    useEffect(()=>{
        
        setTimeout(() => 
        axios.post(API_URL+"/admissionReq/admissionOrder")
            .then(res => setAdmissionOrderList(res.data))
        ,50);
    },[admissionFinish]);

    socket.on("doctor_render", ()=> {console.log("소켓소켓")
    axios.post(API_URL+"/admissionReq/admissionOrder")
        .then(res => setAdmissionOrderList(res.data))
    })

    const sendData = async(admissionIdPk, admissionDueDate , patientName, wardRoom, bedNum, gender, patientAge, patientSsn) => {
        const messageData = {
          admission : room,
          ADMISSION_ID_PK : admissionIdPk,
          ADMISSION_DUEDATE : admissionDueDate,
          PATIENT_NAME: patientName,
          WARDROOM : wardRoom,
          BED_NUM : bedNum,
          GENDER: gender,
          AGE: patientAge,
          PATIENT_SSN: patientSsn
        };
  
        await socket.emit("send_admissionOrder", messageData );
        console.log("이밋입니다")
        let changeState = admissionFinish;
        if(changeState === false){
            changeState = true;
            
        }else if(changeState === true){
            changeState = false;
        }
        
        setAdmissionFinish(changeState);

  
    }


    function putOrderDate(btnState,admissionIdPk, bedInfo,admissionDueDate, patientName ,gender, patientAge , patientSsn, specialityName){
        
        let reg = /([2-4])([0])([1-5])[-]([1-6])/g;

        if(specialityName === "내과"){
            reg = /([2])([0])([1-5])[-]([1-6])/g;
        }else if(specialityName === "정형외과"){
            reg = /([3])([0])([1-5])[-]([1-6])/g;
        }else if(specialityName === "이비인후과"){
            reg = /([4])([0])([1-5])[-]([1-6])/g;
        }

        if(btnState === "assign"){
            if(reg.test(bedInfo)){
                let ward = (bedInfo+"").substring(0,1)*100;
                let roomNum = (bedInfo+"").substring(2,3);
                let bedNum = (bedInfo+"").substring(5,4);
                let wardRoom =  (bedInfo+"").substring(0,3);

                let data = {
                            ADMISSION_ID_PK: admissionIdPk,
                            WARD : ward,
                            ROOM_NUM : roomNum,
                            BED_NUM : bedNum,
                            BTN_STATE : btnState
                    };

                axios.post(API_URL+"/admissionReq/admissionAccept", JSON.stringify(data),
                {
                    headers: {
                    "Content-Type" : `application/json`,
                    },
                })
                .then(res => {if(res.data === 0){alertSweetError("거부","해당 병상은 다른환자가 사용중입니다!")}else{
                    alertSweetSuccess("승인","입원을 승인하였습니다.");
                    inputData.current = "";
                    sendData(admissionIdPk,admissionDueDate , patientName, wardRoom, bedNum, gender, patientAge, patientSsn)}
                });
                let bedInfoState = bedInfo;
                if(bedInfoState === false){
                    bedInfoState = true;
                }else if(bedInfoState === true){
                    bedInfoState = false;
                }
                setBedInfo(()=>bedInfoState);

            }else{
                alertSweetError("거부","호실 및 병상 입력 양식이 틀렸습니다.<br/>예)  내        과 : 201-1<br/>정 형 외 과 : 301-1<br/>이비인후과 : 401-1")
                
                inputData.current = "";
                // inputData.current.focus();
            }
        }else{
            if(bedInfo === null || bedInfo === ""){
                alertSweetError("거부","반려 사유를 입력해주세요.")
                inputData.current = "";
            }else{
                //axios 결과값으로 반려 결과 확인해서 모달창 띄우기
                alertSweetError("승인","반려처리 되었습니다!")
                let data = {
                            ADMISSION_ID_PK: admissionIdPk,
                            REJECT_REASON : bedInfo,
                            BTN_STATE : btnState
                        };
                
                axios.post(API_URL+"/admissionReq/admissionAccept", JSON.stringify(data),
                {
                    headers: {
                    "Content-Type" : `application/json`,
                    },
                })
                inputData.current = "";
                let bedInfoState = bedInfo;
                if(bedInfoState === false){
                    bedInfoState = true;
                }else if(bedInfoState === true){
                    bedInfoState = false;
                }
                setBedInfo(()=>bedInfoState);

                let changeState = admissionFinish;
                if(changeState === false){
                    changeState = true;
                    
                }else if(changeState === true){
                    changeState = false;
                }
                
                setAdmissionFinish(changeState);
                // .then((res)=>{
                
            }
            
        }
        
    }

    
  
    const OrderListData = () => {return(admissionOrderList.map((v,index) => (
                                                        <div className='admission-order-small-square'>
                                                            <ul>
                                                                <li>
                                                                    <p className='position'>
                                                                        <span className='a'>{v.PATIENT_NAME}</span>
                                                                        {/* {v.T_TIME} */}
                                                                        
                                                                        <span className='b'>{v.T_TIME.substring(0,2)} : {v.T_TIME.substring(2,4)}</span>
                                                                        <span className='c'>{v.SPECIALITY_NAME}</span>
                                                                        <span className='d'>{v.EMP_NAME}</span>
                                                                        <span className='e'>{v.TREATMENT_MEMO}</span>
                                                                        {/* <input className='f' type='text' value = "호실입력"/> */}
                                                                        <input className='f' 
                                                                               placeholder='호실 또는 반려사유 입력' 
                                                                               onChange={(e) => {
                                                                                    inputData.current = e.target.value;
                                                                                }} />
                                                                        <span className='g'>
                                                                            <input className='assign' type='button' value = "수락" onClick={() => {putOrderDate("assign",v.ADMISSION_ID_PK , inputData.current , v.ADMISSION_DUEDATE, v.PATIENT_NAME , v.GENDER, v.PATIENT_AGE, v.PATIENT_SSN, v.SPECIALITY_NAME);}}/>
                                                                            <input className='unassign'type='button' value = "반려"onClick={() => {putOrderDate("reject",v.ADMISSION_ID_PK , inputData.current);}}/>
                                                                        </span>
                                                                    </p>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                        )))}
    

    return (
        <div className='admission-order-wapper'>
            <div className='admission-order-big-square'>
                {admissionOrderList.length !== 0 ? <OrderListData /> : '' }
            </div>
        </div>
    )
}

export default AdmissionOrder