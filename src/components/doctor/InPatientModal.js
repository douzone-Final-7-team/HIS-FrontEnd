import React from "react";
 
import '../../components/doctor/InPatientModal.scss';

function InPatientModal(props) {
 
function closeModal() {
    props.closeModal();
  }
 
  return (
    <div className="inPatientModal" onClick={closeModal}>
      <div className="inPatientModalBody" onClick={(e) => e.stopPropagation()}>
        <button id="modalCloseBtn" onClick={closeModal}>
          ✖
        </button>
        {props.children}
      </div>
    </div>
  );
}
 
export default InPatientModal;