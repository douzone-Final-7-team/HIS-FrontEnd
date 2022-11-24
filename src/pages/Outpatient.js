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


// 치료오더
const TreatmentOrder = () => {
  return (
    <div id="tab-treatment-order">
        <p className="icon-title">
          <span className="icon">&gt;</span><span className="task-title">치료오더</span>
        </p>
        <table className='styled-table'>
          <thead>
            <tr>
              <th></th>
              <th>체크</th>
              <th>분류</th>
              <th>처방내역</th>
              <th>비고</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>
                <input type="checkbox"/>
              </td>
              <td>기본</td>
              <td>경구식이 시작</td>
              <td>-</td>
            </tr>
            <tr>
              <td>2</td>
              <td><input type="checkbox"/></td>
              <td>주사/수액</td>
              <td>수액 뭐머 놔주세요</td>
              <td>-</td>
            </tr>
            <tr>
              <td>3</td>
              <td><input type="checkbox" /></td>
              <td>내복약</td>
              <td>경구식이 시작</td>
              <td>-</td>
            </tr>
          </tbody>
        </table>
      </div>
  );
}


// 진료메모
const MedicalNote = () => {
  return (
    <div id="tab-medical-note">
        <div className="medicine">
          <p className="icon-title">
            <span className="icon">&gt;</span><span className="task-title">처방약</span>
          </p>
          <div className="task-content"><p>Lorem ipsum dolor sit amet consectetur </p></div>
        </div>
        <div className="prescription-details">
          <p className="icon-title">
            <span className="icon">&gt;</span><span className="task-title">처방상세</span>
          </p>
          <div className="task-content"><p>Lorem ipsum dolor sit amet consectetur </p></div>
        </div>
      </div>
  );
}



// 진료메모 / 치료오더 컴포넌트
const Order = () => {
  
  const [ active, setActive ] = useState(true);

  const menuList = {
    true: <MedicalNote/>,
    false: <TreatmentOrder/>
  };

  const changeMenu = () => {
    setActive(!active);
  };
  

  return (
    <div className='order'>
      <ul className="tab-menu">
        <li className={`${active === true? 'active': ''}`} onClick={changeMenu}>진료메모</li>
        <li className={`${active === false? 'active': ''}`} onClick={changeMenu}>치료오더</li>
      </ul>
      <div id="tab-content">
        {menuList[active]}
      </div>
    </div>
  );
}

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
  }, [dispatch, inputValue]);

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
            <div className='btns'>
              <a href='#!' className='btn'>등록</a>
              <a href='#!' className='btn '>접수</a>
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
