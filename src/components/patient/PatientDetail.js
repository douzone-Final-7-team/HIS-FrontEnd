import React from 'react'
import './patientDetail.scss';


function PatientDetail() {
  return (
    <div className='table'>
      <div className='item th'>S/A</div>
      <div className='item td'><input/></div>
      <div className='item th'>Tel</div>
      <div className='item td'><input/></div>
      <div className='item th'>진료과</div>
      <div className='item td'>
        <select>
          <option>내과</option>
          <option>이비인후과</option>
          <option>정형외과</option>
        </select>
      </div>
      <div className='item th'>담당의</div>
      <div className='item td'>
        <select>
          <option>김의사</option>
          <option>이의사</option>
          <option>최의사</option>
        </select>
      </div>
      <div className='item th'>보험유무</div><div className='item td'><input/></div>
      <div className='item th'>진료구분</div><div className='item td'>초/재진</div>
      <div className='item th'>주소</div>
      <div className='item td'><input/></div>
      {/* <div className='item th'>증상</div> */}
      {/* <div className='item td'><input/></div> */}
    </div>
  )
}

export default PatientDetail
