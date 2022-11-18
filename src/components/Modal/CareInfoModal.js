import React from "react";
import './careInfoModalmodal.scss';

function Modal({setExcuteModal, excuteModal}) {
  
 

  return (
    <div className="Modal" onClick={()=> setExcuteModal(excuteModal)}>
      <div className="modalBody" onClick={(e) => e.stopPropagation()}>
        <button id="modalCloseBtn" onClick={()=> setExcuteModal(excuteModal)}>
          ✖
        </button>
        <div className="modal-container">
            <div className="modal-main">
                <div className="modalBox">
                  <p className="modalTitle">간호 기록 수정</p>
                  <hr />
                </div>
                <div className="modal-content">
                      <ul className="modal-label-container">
                        <label className="modal-infoLabel">날짜 : </label>
                        <label className="modal-infoLabel">병호실 : </label> 
                        <label className="modal-infoLabel">환자명 : </label>  
                        <label className="modal-infoLabel">간호 기록 : </label>
                        <label className="modal-infoLabel">작성자 : </label>                   
                      </ul>
                      <ul className="modal-input-container">
                        <input className="modal-infoInput" readOnly/>
                        <input className="modal-infoInput" readOnly/>
                        <input className="modal-infoInput" readOnly/>
                        <input className="modal-infoInput" />
                        <input className="modal-infoInput" readOnly/>                    
                      </ul>
                    </div>
                        <a href='#!' className='btn'>수정</a> 
            </div>
        </div>
      </div>
      
    </div>
  );
}
 
export default Modal;
