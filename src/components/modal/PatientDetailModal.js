import React from "react";
// style
import '../../styles/scss/reset.scss';
import '../../components/modal/PatientDetail.scss';
// components 

const PatientDetailModal = () => {
    return(
        <div className="detail-box">
            <main>
              <div>
                  <p>진료 기록</p>
                  <hr />
                  <div>
                      <ul className="infoUl">
                          <li><label>치료 오더</label> <input readOnly/></li>
                          <li><label>약 처방</label> <input readOnly /></li>
                          <li><label>입원 내역</label> <input readOnly /></li>                        
                      </ul>
                  </div>
              </div>
            </main>
        </div>
    )
}

export default PatientDetailModal;