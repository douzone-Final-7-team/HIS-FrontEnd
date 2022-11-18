import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import '../../styles/tab.scss'
import Outpatientschedule from './Outpatientschedule';
import HandOver from './HandOver';

//redux
import { getReceiveHandOver } from '../../redux/AdmissionPatientInfoApi';
import { useDispatch } from 'react-redux';

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

export default function GlobalMangementTab() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const dispatch = useDispatch();
 
  const ToHandOver = () =>{
   // 시큘리티 마무리 되면 userID얻어서 저장
    let user = {
      "userName" : "wjdgus"
    }

    let handOverElement = JSON.stringify(user)

    dispatch(getReceiveHandOver(handOverElement));

  }
  
  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="환자 일정" {...a11yProps(0)} />
          <Tab label="인계 사항" {...a11yProps(1)} onClick={ToHandOver}/>
          <Tab label="입원 예정" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Outpatientschedule/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <HandOver/>
      </TabPanel>
      <TabPanel value={value} index={2}>
        동석이꺼 참고해서 수정
      </TabPanel>
    </Box>
  );
}


