import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { API_URL } from '../../utils/constants/Config';
import './admissionOrder.scss';

const AdmissionOrder = () => {

    const [admissionOrderList, setAdmissionOrderList] = useState([{
        ADMISSION_ID_PK : "",
        PATIENT_NAME : "",
        T_TIME : "",
        SPECIALITY_NAME : "",
        EMP_NAME : "",
        TREATMENT_MEMO : "",        
        WARD : ""
    }]);
    useEffect(()=>{
        axios.post(API_URL+"/admissionReq/admissionOrder")
            .then(res => setAdmissionOrderList(res.data));
    
    },[]);
    const inputData = useRef("");

    function putOrderDate(admissionIdPk, bedInfo, btnState){
        const reg = /([2-4])([0])([1-5])[-]([1-6])/g;
        if(btnState === "assign"){
            if(reg.test(bedInfo)){
                alert("만족 여부");
                let ward = (bedInfo+"").substring(0,1)*100;
                let roomNum = (bedInfo+"").substring(2,3);
                let bedNum = (bedInfo+"").substring(5,4);

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
                // .then((res)=>{
                //  소켓
                // })

            }else{
                alert("호실 및 병상 입력 양식이 틀렸습니다. 다시 입력해 주십시오.\n예) 201-1");
                // inputData.current.focus();
            }
        }else{
            if(bedInfo === null){
                alert("반려 사유를 입력해주세요.");
            }else{
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
                // .then((res)=>{
                //  소켓
                // })
            }
            
        }
        
    }

    
  
    const oderListData = admissionOrderList.map((v,index) => (
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
                                                                            
                                                                            <input className='assign' type='button' value = "수락" onClick={() => {putOrderDate(v.ADMISSION_ID_PK , inputData.current , "assign");}}/>
                                                                            <input className='unassign'type='button' value = "반려"onClick={() => {putOrderDate(v.ADMISSION_ID_PK , inputData.current , "reject");}}/>
                                                                        </span>
                                                                    </p>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                        ))
    

    return (
        <div className='admission-order-wapper'>
            <div className='admission-order-big-square'>
                {oderListData}
            </div>
        </div>
    )
}

export default AdmissionOrder