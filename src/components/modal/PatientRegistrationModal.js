import React from "react";
// style
import '../../styles/scss/reset.scss';
import './patientRegistrationModal.scss';
// components 

const PatientRegistrationModal = () => {
    return(
        <div className="patientRegistrationModal">
            <main className="main">
              <div className="infoBox">
                  <p className="infoTitle">환자 등록</p>
                  <hr />
                  <div className="infoContent">
                      <ul className="infoUl">
                          <li className="infoLi"><label className="infoLabel">이름</label> <input className="infoInput"/></li>
                          <li className="infoLi"><label className="infoLabel">주소</label> <input className="infoInput"/></li>
                          <li className="infoLi"><label className="infoLabel">전화번호</label> <input className="infoInput"/></li>
                          <li className="infoLi"><label className="infoLabel">주민등록번호</label> <input className="infoInput"/></li>
                          <li className="infoLi"><label className="infoLabel">보험</label> <input className="infoInput"/></li>                          
                          <button className="patientReg">환자 등록</button>
                      </ul>
                  </div>
              </div>
            </main>
        </div>
    )
}

export default PatientRegistrationModal;