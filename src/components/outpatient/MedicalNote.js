import React from 'react'

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

export default MedicalNote
