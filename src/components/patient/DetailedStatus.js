import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getTreatmentInfo, getPatientRegistrationInfo, addPatientStatusInfo, changeOutpatientStatus, getDetailedMedicalHistory } from '../../redux/OutpatientPageInfoApi';
import { checkOpStatusCode, selectSpeciality, selectEmpName } from '../../redux/outpatientPageInfoSlice';
// style
import './detailedStatus.scss';
// Library
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';


const DetailedStatus = ({ data, index }) => {
  let dispatch = useDispatch();
  const className = ['box', 'waiting-order', 'selected'];


  // contextMenu 상태 분류 (진료-대기 / 수납대기)
  let opStatusClassification = false;
  // contextMenu 세부 상태 분류 (진료 true /대기 false)
  let opDetailedClassification = false;

  data.patInfo.map((info) => {
    dispatch(checkOpStatusCode(info.status)); //treatmentOrder에서 필요
    if(info.status === '진료중' || info.status === '대기중') {
      opStatusClassification = true;
      if(info.status === '진료중') {
        opDetailedClassification = true;
      }
    }
  })


  // 혜지 환자현황 클릭 이벤트
  const getReceiveId = (data) => {
    console.log(data)
    const { receiveId, patName, PATIENT_SSN, EMP_NAME, SPECIALITY, PATIENT_ID_PK, TREATMENT_DATE, REGISTRATION_TIME} = data;
      dispatch(getTreatmentInfo(receiveId));
      dispatch(getPatientRegistrationInfo({patName, PATIENT_SSN}));
      dispatch(selectSpeciality(SPECIALITY));
      dispatch(selectEmpName(EMP_NAME));
      dispatch(getDetailedMedicalHistory({PATIENT_ID_PK, TREATMENT_DATE, REGISTRATION_TIME}));
    }

  // contextMenu
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [ sendData, setSendData ] = useState();
  const [ receiveId, setReceiveId ] = useState();

  let insertData;

  const handleClick = (e, data) => {
    console.log(data)
    setAnchorEl(e.currentTarget);
    insertData = {
      receiveId: data.receiveId,
      patientId: data.PATIENT_ID_FK,
      empId: data.EMP_ID_FK
    }
    setSendData(insertData);
    setReceiveId(data.receiveId)
  }
  const handleClose = () => {
    setAnchorEl(null);
  }
  
  const handleStatus = (e) => {
    // console.log(e.target.id)
    // console.log(receiveId)
    console.log(e.target.id)

    if(e.target.id === '진료') {
      dispatch(addPatientStatusInfo(sendData))
    } else if(e.target.id === '대기') {
      const opStatusCode = 'OC';
      dispatch(changeOutpatientStatus({receiveId, opStatusCode})); 
    }
  }
    
  
  return (
    <div className='detailed-status'>
      <p>{index+1}진료실 {data.EMP_NAME}</p>
      <div className='order-content'>
          {data.patInfo.map((data, index) => (
            <div key={index} 
              className={data.OUTPATIENT_STATUS_CODE + className[0] + ' ' + className[1] + ' ' + className[2]} 
              onClick={() => {getReceiveId(data)}} 
              id={index}
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onContextMenu={opStatusClassification === true ? (e) => handleClick(e, data) : (e) => {e.preventDefault();}}>

              <p className='waiting-name'>
                {data.patName}
                <span className='medical-hours'>{data.regTime}</span>
              </p>
              <p className={data.OUTPATIENT_STATUS_CODE}>{data.status}</p>
            </div> 
          ))}
      </div>
      {opDetailedClassification === true ?
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
          style={{left:"170px" , top:"-25px"}}
        >
          <MenuItem id="대기" onClick={(e)=>{handleClose(); handleStatus(e);}}>대기</MenuItem>
        </Menu> 
      : 
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
          style={{left:"170px" , top:"-25px"}}
        >
          <MenuItem id="진료" onClick={(e)=>{handleClose(); handleStatus(e);}}>진료</MenuItem>
        </Menu> 
      } 
    </div>
  )
}

export default DetailedStatus;