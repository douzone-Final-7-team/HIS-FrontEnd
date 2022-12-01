import React, { useState } from 'react'
// style
import './medicalHistory.scss';
// components

const MedicalHistory = ({registrationInfo, data}) => {
  const [detail, setDetail] = useState(false);
  return (
    <div className='medical-history'>
      <table>
        <thead>
          <tr>
            <th>날짜</th>
            <th>진단명</th>
            <th>처방 및 치료내역</th>
            <th>상세정보</th>
          </tr>
          {registrationInfo!==null && registrationInfo!==undefined? registrationInfo.treatmentInfo.map((data, index) => (
            <tr key={index}>
              <td>{data.TREATMENT_DATE}</td>
              <td>{data.DIAGNOSIS_CODE}</td>
              <td>{data.TREATMENT_MEMO}</td>
              <td><p className='btn-detail' onClick={() => setDetail(!detail)}>상세기록</p></td>
            </tr>
          )) 
          : 
          (data!=null && data!==undefined? data.treatmentInfo.map((data, index) => (
            <tr key={index}>
              <td>{data.TREATMENT_DATE}</td>
              <td>{data.DIAGNOSIS_CODE}</td>
              <td>{data.TREATMENT_MEMO}</td>
              <td><p className='btn-detail' onClick={() => setDetail(!detail)}>상세기록</p></td>
            </tr>
          )) : <>
          <tr>
            <td>날짜</td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>날짜</td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>날짜</td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </>)
          }
            
            
        </thead>
        <tbody></tbody>
      </table>
    </div>
  )
}

export default MedicalHistory
