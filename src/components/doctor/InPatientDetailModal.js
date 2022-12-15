import axios from "axios";
import React, { useEffect, useState } from "react";

import '../../components/doctor/InPatientDetail.scss';

const InPatientDetailModal = ({ outInfoElements }) => {

    const [inpatientDetailInfo, setInpatientDetailInfo] = useState([{}]);
    const [inpatientCure, setinpatientCure] = useState([{}]);
    const [inpatientMedicineRecord, setInpatientMedicineRecord] = useState([{}]);

    useEffect(() => {

        const outInfoElement = {
            name: outInfoElements[0],
            ward: outInfoElements[1],
            roomNum: outInfoElements[2],
            bedNum: outInfoElements[3]
        }

        axios.post("http://192.168.0.34:9090/patient/outInfo", JSON.stringify(outInfoElement), 
        {
            headers: {
                "Content-Type" : `application/json`,
              }
        })
        .then((res) => {
            setInpatientDetailInfo(res.data)
        });

        axios.post("http://192.168.0.34:9090/admission/careInfos", JSON.stringify(outInfoElement), 
        {
            headers: {
                "Content-Type" : `application/json`,
              }
        })
        .then((res) => {
            setinpatientCure(res.data)
        });

        axios.post("http://192.168.0.34:9090/admission/mediRecords", JSON.stringify(outInfoElement), 
        {
            headers: {
                "Content-Type" : `application/json`,
              }
        })
        .then((res) => {
            console.log(res.data)
            setInpatientMedicineRecord(res.data)
        });

    }, [outInfoElements])

    return(
        <div className="inpatient-detailBox">
            <header>
                <p>입원 환자 정보</p>
                <hr />
            </header>
            <div className="inpatientInfo-div">
                <table className="inpatient-table">
                    <tbody>
                        <tr>
                            <th>환자명</th>
                            <td><input value={inpatientDetailInfo.PATIENT_NAME || ''} readOnly /></td>
                            <th>S/A</th>
                            <td className="genderAge">{inpatientDetailInfo.GENDER || ''}/{inpatientDetailInfo.PATIENT_AGE || ''}</td>
                            <th className="devide1">환자 전화 번호</th>
                            <td className="devide2"><input value={inpatientDetailInfo.PATIENT_TEL || ''} readOnly /></td>
                        </tr>
                        <tr>
                            <th>보호자명</th>
                            <td><input value={inpatientDetailInfo.PROTECTOR_NAME || ''} readOnly /></td>
                            <th>보호자 연락처</th>
                            <td><input value={inpatientDetailInfo.PROTECTOR_TEL || ''} readOnly /></td>
                            <th className="devide1">환자 주소</th>
                            <td className="devide2"><input value={inpatientDetailInfo.PATIENT_ADDR || ''} readOnly /></td>
                        </tr>
                        <tr>
                            <th>담당의</th>
                            <td><input value={inpatientDetailInfo.EMP_NAME || ''} readOnly /></td>
                            <th>진료과</th>
                            <td><input value={inpatientDetailInfo.SPECIALITY_NAME || ''} readOnly /></td>
                            <th className="devide1">진단명</th>
                            <td className="devide2"><input value={inpatientDetailInfo.DIAGNOSIS || ''} readOnly /></td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <hr />

            <div className="cure-div">

                <p>환자 간호 기록</p>
                <br/>
                <table className="cure-table">
                    <thead>
                        <tr>
                            <th>날짜</th>
                            <th>간호 기록</th>
                            <th>작성자</th>
                        </tr>
                    </thead>
                    {inpatientCure.map((data, index) => (
                        <tbody key={index}>
                            <tr>
                                <td className="cure-date">{(data.CARE_DATE || '').substring(0,10)} {(data.CARE_DATE || '').substring(11, 16)}</td>
                                <td className="cure-content">{data.CARE_CONTENT || ''}</td>
                                <td className="cure-writers">{data.NURSE_NAME || ''}</td>
                            </tr>
                        </tbody>
                    ))}
                </table>

            </div>

            <hr />

            <div className="medicine-record-div">

                <p>환자 처방 기록</p>
                <br />
                <table className="medicine-record-table">
                    <thead>
                        <tr>
                            <th>날짜</th>
                            <th>복용 확인</th>
                            <th>처방 내용</th>
                            <th>처방 약</th>
                            <th>수행자</th>
                        </tr>
                    </thead>
                    {inpatientMedicineRecord.map((data, index) => (
                        <tbody key={index}>
                            <tr>
                                <td>{(data.ORDER_DATE || '').substring(0,10)} {(data.ORDER_DATE || '').substring(11, 16)}</td>
                                <td><input type={"checkbox"} id={index} checked={data.TAKE_MEDICINE_STATUS || ''} readOnly /></td>
                                <td>{data.ORDER_CONTENT}</td>
                                <td>{data.MEDICINE_NAME}</td>
                                <td>{data.ORDERER}</td>
                            </tr>
                        </tbody>
                    ))}
                </table>
            </div>
            <hr />
        </div>
    );

}

export default InPatientDetailModal;