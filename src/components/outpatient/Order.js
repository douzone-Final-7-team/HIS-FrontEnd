import React, { useState } from 'react'
// components
import MedicalNote from './MedicalNote';
import TreatmentOrder from './TreatmentOrder';

const Order = ({ patientDetails }) => {
  
  const [ active, setActive ] = useState(true);

  const menuList = {
    true: <MedicalNote patientDetails={patientDetails} />,
    false: <TreatmentOrder patientDetails={patientDetails} />
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

export default Order
