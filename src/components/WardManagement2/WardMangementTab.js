import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import OutpatientDetail from './OutPatientDetail';
import CareInfo from './CareInfo';
import TakeMediCheck from './TakeMediCheck';
import '../../styles/tab.scss'
import '../WardManagement2/wardMangementTab.scss';

//redux
import { useDispatch, useSelector } from 'react-redux';
import {getCareInfo, getMediRecords} from '../../redux/AdmissionPatientInfoApi';


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function WardMangeMentTap() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // 비동기 입원 환자 정보
  const outpatientDetail = useSelector(state=>{
    return state.outPatientInfo.value[1]
  })

  // 비동기 입원 간호 기록
  const dispatch = useDispatch();
  const careElements = useSelector(state=>{
    return state.outPatientInfo.value[0]
  })  
 
  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" >
          <Tab label="환자 정보" {...a11yProps(0)} />
          <Tab label="간호 기록" {...a11yProps(1)} onClick={() => { dispatch(getCareInfo(careElements))}}/>
          <Tab label="처방 기록" {...a11yProps(2)} onClick={() => { dispatch(getMediRecords(careElements))}}/>
        </Tabs>
      </Box>
      <div className='outpatient-info-wapper'>
            <div className='outpatient-info'>
              <p><span>환자명 : </span>{(outpatientDetail != null) ? outpatientDetail.PATIENT_NAME : ""}</p>
            </div>                    
            <div className='outpatient-info'>
              <p><span>S/A : </span>{(outpatientDetail != null) ?  outpatientDetail.GENDER : ""}/{(outpatientDetail != null) ?  outpatientDetail.PATIENT_AGE: ""}</p>
            </div>                    
            <div className='outpatient-info'>
              <p><span>주치의 : </span>{(outpatientDetail != null) ? outpatientDetail.SPECIALITY_NAME: ""}/{(outpatientDetail != null) ?  outpatientDetail.EMP_NAME : ""}</p>
            </div>
            <div className='outpatient-info'>
              <p><span>입원일 : </span>{(outpatientDetail != null) ?  outpatientDetail.ADMISSION_DATE: ""}</p>
            </div>
            <div className='outpatient-info'>
              
                <div className='discharge-duedate'>
                <span>퇴원 예정일 : </span>  
                 {(outpatientDetail != null) ? ( (outpatientDetail.ADMISSION_DUEDATE != null) ?<input className = 'discharge-year' type="text" minLength = "4" maxLength ="4" value={(outpatientDetail.ADMISSION_DUEDATE+ " ").substring(0,4)} readOnly></input>
                 :<input className = 'discharge-year' type="text" minLength = "4" maxLength ="4" ></input>)
                 :<input className = 'discharge-year' type="text" minLength = "4" maxLength ="4" ></input>}
                  -
                  {(outpatientDetail != null) ? ((outpatientDetail.ADMISSION_DUEDATE != null) ? <input className = 'discharge-month' type="text" minLength = "2" maxLength ="2" value={(outpatientDetail.ADMISSION_DUEDATE+ " ").substring(5,7)} readOnly></input>
                 :<input className = 'discharge-month' type="text" minLength = "2" maxLength ="2" ></input>)
                 :<input className = 'discharge-month' type="text" minLength = "2" maxLength ="2" ></input>}
                  -
                  {(outpatientDetail != null) ? ((outpatientDetail.ADMISSION_DUEDATE != null) ? <input className = 'discharge-day'  type="text" minLength = "2" maxLength ="2"  value={(outpatientDetail.ADMISSION_DUEDATE+ " ").substring(8,10)} readOnly></input>
                 :<input className = 'discharge-day' type="text" minLength = "2" maxLength ="2" ></input>)
                 :<input className = 'discharge-day' type="text" minLength = "2" maxLength ="2" ></input>}
                  
                  <a href='#!' className='btn'>등록</a>      
                </div>
            </div>                
        </div>
      <TabPanel value={value} index={0}>
      <OutpatientDetail/>
        </TabPanel>
      <TabPanel value={value} index={1}>
        <CareInfo/>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <TakeMediCheck/>
      </TabPanel>
    </Box>
  );
}


