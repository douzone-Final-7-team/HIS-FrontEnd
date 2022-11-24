import React, { useCallback, useState } from 'react'

// style
import '../styles/scss/reset.scss';
import '../styles/outpatient.scss';
// components
import EmpBar from '../components/employee/EmpBar';
import PatientDetail from '../components/patient/PatientDetail';
import PatientStatus from '../components/patient/PatientStatus';
import MedicalHistory from '../components/patient/MedicalHistory';
import { useDispatch, useSelector } from 'react-redux';
import PatientAction from '../redux/modules/patient/PatientAction';
// components
import Order from '../components/outpatient/Order';


const Outpatient = () => {

  const patient = useSelector(state => state.value);

  let dispatch = useDispatch();
  
  const [ inputValue, setInputValue ] = useState('');

  const handleInputChange = useCallback((e) => {
    setInputValue(inputValue);
  }, [inputValue]);

  const onEnter = useCallback((e) => {
    if(e.key === 'Enter') {
      dispatch(PatientAction.getTest(inputValue));
    }
  }, []);

  return (
    <div className='outpatient'>
      <main className='main'>
        <div className='top'>
          <EmpBar />
        </div>
        <div className='middle'>
          <div className='search-info'>
            <div className='input-patient'>
              <form action=''>
                <label>이름</label>
                <input 
                  value={inputValue}
                  onChange={handleInputChange}
                  onKeyUp={onEnter}
                />
                <label>주민등록번호</label>
                <input type='number'/> - <input type='number'/>
              </form>
            </div>
          </div>
          <PatientDetail patient={patient}/>
          <MedicalHistory />
        </div>
        <PatientStatus className='bottom1'/>
        <Order/>
      </main>
    </div>
  )
}

export default Outpatient;
