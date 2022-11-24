import React from 'react'
import { useSelector } from 'react-redux';
// style
import './outpatientDetail.scss';

const OutpatientDetail = () => {

  const outpatientDetail = useSelector(state=>{
    return state.outPatientInfo.value[1]
  })
  return (
    <div className='outpatient-detail'>
      <table>
        <tbody>
          <tr>
            <th className='devide1'>환자명</th>
            <td >{(outpatientDetail != null) ? outpatientDetail.PATIENT_NAME : "   "}</td>
            <th children='devide2'>성별</th>
            <td>{(outpatientDetail != null) ?  outpatientDetail.GENDER : "   "}</td>
            <th className='devide3'>환자 전화 번호</th>
            <td className='devide4'>{(outpatientDetail != null) ?  outpatientDetail.PATIENT_TEL : "   "}</td>           
          </tr>
          <tr>
            <th className='devide1'>보호자명</th>
            <td>{(outpatientDetail != null) ?  outpatientDetail.PROTECTOR_NAME : "   "}</td>
            <th children='devide2'>보호자 연락처</th>
            <td>{(outpatientDetail != null) ?  outpatientDetail.PROTECTOR_TEL : "  "}</td>
            <th className='devide3'>환자 주소</th>
            <td className='devide4'>{(outpatientDetail != null) ?  outpatientDetail.PATIENT_ADDR : "  "}</td>           
          </tr>
          <tr>
            <th className='devide1'>담당의</th>
            <td>{(outpatientDetail != null) ?  outpatientDetail.EMP_NAME : "  "}</td>
            <th children='devide2'>진료과</th>
            <td>{(outpatientDetail != null) ? outpatientDetail.SPECIALITY_NAME: "  "}</td>
            <th className='devide3'>진단명</th>
            <td className='devide4'>{(outpatientDetail != null) ?  outpatientDetail.DIAGNOSTIC_NAME : "  "}</td>           
          </tr>
        </tbody>
      </table>
     
    </div>
  )
}

export default OutpatientDetail
