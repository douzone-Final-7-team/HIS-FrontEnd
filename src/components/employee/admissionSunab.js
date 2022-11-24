import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Waiting4Payment from '../patient/Waiting4Payment';
import '../employee/admissionSunab.scss';
import '../../styles/tab.scss';
import Receipt from '../patient/Receipt';
import AdmissionOrder from './admissionOrder';
import DischargeDue from './dischargeDue';

// style

// components


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

  
  
  export default function AdmissionSunab() {
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
      };
    
  
    return (
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="수납 대기" {...a11yProps(0)} />
            <Tab label="입원 오더" {...a11yProps(1)} />
            <Tab label="퇴원 예정" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
            <div className='qwer'>
                <div className='a'>
                    <ul className = 'filter'>
                        <li>일 퇴원 환자</li>
                        <li>익일 퇴원 환자</li>
                    </ul>
                </div>
                <div className='b'>
                    <Waiting4Payment />
                </div>
                <div className='c'>
                    <Receipt />
                </div>
            </div>
        </TabPanel>
        <TabPanel value={value} index={1}>
            <div className='asdf'>
                <AdmissionOrder />
            </div>
        </TabPanel>
        <TabPanel value={value} index={2}>
            <div className='asdf'>
                <DischargeDue />
            </div>
        </TabPanel>
      </Box>
    );
}