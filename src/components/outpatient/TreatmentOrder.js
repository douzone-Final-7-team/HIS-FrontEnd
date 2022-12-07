import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changeOutpatientStatus } from '../../redux/OutpatientPageInfoApi';

const TreatmentOrder = ({ patientDetails }) => {
  console.log(patientDetails)

  const dispatch = useDispatch();
  
  // 환자현황 : 환자 상태값
  const opStatusInfo = useSelector(state =>  state.checkOpStatusCode.value[2]);

  // 외래진료환자 상태 : 치료
  let onTreatmentStatus = false;
  //  외래진료환자 상태 : 수납완료
  let completionStatus = false;
  if(opStatusInfo === '치료') {
    onTreatmentStatus = true;
  } else if(opStatusInfo === '수납완료') {
    completionStatus = true;
  }
  
  const receiveId =  patientDetails.RECEIVE_ID_PK;
  const changePatientCode = () => {
    const opStatusCode = 'OD';
    dispatch(changeOutpatientStatus({receiveId, opStatusCode})); 
  }

  return (
    <div>
      <div id="tab-treatment-order">
        <p className="icon-title">
          <span className="icon">&gt;</span><span className="task-title">치료오더</span>
        </p>
        <table className='styled-table'>
          <thead>
            <tr>
              <th>체크</th>
              <th>처방내역</th>
              <th>비고</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{completionStatus === true ? <input type="checkbox" checked/> : <input type="checkbox"/>}</td>
              {patientDetails!==null && patientDetails!==undefined ?
              <td>{patientDetails.TREATMENT_ORDER}</td>
              :
              <td></td>}
              <td>-</td>
            </tr>
          </tbody>
        </table>
        {onTreatmentStatus === true ? <p className='btn-tbl'><a href='#!' className='btn' onClick={changePatientCode}>완료</a></p> : ''}
      </div>
    </div>
  )
}

export default TreatmentOrder
