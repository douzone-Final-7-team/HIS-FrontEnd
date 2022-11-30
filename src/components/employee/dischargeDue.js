import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { API_URL } from '../../utils/constants/Config';
import './dischargeDue.scss';

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


const DischargeDue = () => {
    const [disChargeDueList, setDisChargeDueList] = useState([]);
    useEffect(()=>{
        axios.get(API_URL+"/AdmissionFront/dischargelist")
            .then(res => setDisChargeDueList(res.data));
    
    },[]);
    
    const DisChargeListData = ()=>{return(disChargeDueList.map((v,index) => (
                                                                    
                                                                    <div className='discharge-Due-small-square'>
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
                                                                                    {v.ADMISSION_STATUS_CODE === "IE" ? <input className='g complete'type='button' value = "퇴실완료"/>:<input className='g un-complete'type='button' value = "미수납"/>}
                                                                                    
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