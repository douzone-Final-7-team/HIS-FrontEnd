import React from 'react';
import { useDispatch } from 'react-redux';
import { getTreatmentInfo, getPatientRegistrationInfo } from '../../redux/OutpatientPageInfoApi';
// style
import './detailedStatus.scss';


const DetailedStatus = ({data, index}) => {
  // console.log(data)
  let dispatch = useDispatch();

  // 혜지 환자현황 클릭 이벤트
  const getReceiveId = (data) => {
    const { receiveId } = data;
    const { patName } = data;
    const { PATIENT_SSN } = data;
      dispatch(getTreatmentInfo(receiveId));
      dispatch(getPatientRegistrationInfo({patName, PATIENT_SSN}));
    }


    
  
  return (
    <div className='detailed-status'>
      <p>{index+1}진료실 {data.EMP_NAME}</p>
      <div className='order-content'>
            {data.patInfo.map((data, index) => (
              <div key={index} className='waiting-order selected' onClick={() => {getReceiveId(data)}}>
                <p className='waiting-name'>
                  {data.patName}
                  <span className='medical-hours'>{data.regTime}</span>
                </p>
                <p className='status-value'>{data.status}</p>
              </div> 
            ))}
            </div>
    </div>
  )
}

export default DetailedStatus;