import axios from 'axios';
import React, { useEffect, useState } from 'react';
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
                                                                        <input className='f' type='text' value = "호실입력"/>
                                                                        <span className='g'>
                                                                            <input type="hidden" value={index} />
                                                                            <input className='assign' type='button' value = "수락"/>
                                                                            <input className='unassign'type='button' value = "반려"/>
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