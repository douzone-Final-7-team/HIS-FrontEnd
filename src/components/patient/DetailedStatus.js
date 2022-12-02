import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getTreatmentInfo, getPatientRegistrationInfo } from '../../redux/OutpatientPageInfoApi';
// style
import './detailedStatus.scss';
// Library
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';


const DetailedStatus = ({ data, index }) => {
  let dispatch = useDispatch();

  // 혜지 환자현황 클릭 이벤트
  const getReceiveId = (data) => {
    const { receiveId } = data;
    const { patName } = data;
    const { PATIENT_SSN } = data;
      dispatch(getTreatmentInfo(receiveId));
      dispatch(getPatientRegistrationInfo({patName, PATIENT_SSN}));
    }

  // contextMenu
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  // const [ sendData, setSendData ] =useState()

  // let insertData;
  const handleClick = (e, data) => {
    setAnchorEl(e.currentTarget);
    console.log(data)
    // insertData = {}
  }
  const handleClose = () => {
    setAnchorEl(null);
  }
  const handleStatus = (e) => {
    console.log(e.target.id)

    if(e.target.id === '진료') {
      // dispatch()
      console.log('api 호출필요')
    }
  }
    
  
  return (
    <div className='detailed-status'>
      <p>{index+1}진료실 {data.EMP_NAME}</p>
      <div className='order-content'>
          {data.patInfo.map((data, index) => (
            <div key={index} 
              className='waiting-order selected' 
              onClick={() => {getReceiveId(data)}} 
              id={index}
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onContextMenu={(e) => handleClick(e, data)}>

              <p className='waiting-name'>
                {data.patName}
                <span className='medical-hours'>{data.regTime}</span>
              </p>
              <p className='status-value'>{data.status}</p>
            </div> 
          ))}
      </div>
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
          <MenuItem id="대기" onClick={(e)=>{handleClose(); handleStatus(e);}}>대기</MenuItem>
        </Menu>
    </div>
  )
}

export default DetailedStatus;