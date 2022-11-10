import React from 'react'
// style
import './medicalHistory.scss';

const MedicalHistory = () => {
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
          <tr>
            <td>2022-10-25</td>
            <td><input placeholder='진단명 입출력'/></td>
            <td><input placeholder='몸살 주사 및 해열제 소염진통제 처방'/></td>
            <td><input placeholder='처방'/></td>
          </tr>
          <tr>
            <td>2022-10-25</td>
            <td><input placeholder='진단명 입출력'/></td>
            <td><input placeholder='몸살 주사 및 해열제 소염진통제 처방'/></td>
            <td><input placeholder='처방'/></td>
          </tr>
          <tr>
            <td>2022-10-25</td>
            <td><input placeholder='진단명 입출력'/></td>
            <td><input placeholder='몸살 주사 및 해열제 소염진통제 처방'/></td>
            <td><input placeholder='처방'/></td>
          </tr>
        </thead>
        <tbody></tbody>
      </table>
    </div>
  )
}

export default MedicalHistory
