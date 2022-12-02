import React from 'react'
import { useDispatch } from 'react-redux'
import { changeOutpatientStatus } from '../../redux/OutpatientPageInfoApi';

const TreatmentOrder = ({ patientDetails }) => {
  const dispatch = useDispatch();
  
  const receiveId =  patientDetails.RECEIVE_ID_PK;
  const changePatientCode = () => {
    dispatch(changeOutpatientStatus(receiveId)); 
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
              <td><input type="checkbox"/></td>
              {patientDetails!==null && patientDetails!==undefined ?
              <td>{patientDetails.TREATMENT_ORDER}</td>
              :
              <td></td>}
              <td>-</td>
            </tr>
          </tbody>
        </table>
        <p className='btn-tbl'><a href='#!' className='btn' onClick={changePatientCode}>완료</a></p>
      </div>
    </div>
  )
}

export default TreatmentOrder
