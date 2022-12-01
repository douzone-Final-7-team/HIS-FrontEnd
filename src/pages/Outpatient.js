import React from 'react'
import { useSelector } from 'react-redux';
// style
import '../styles/scss/reset.scss';
import '../styles/outpatient.scss';
// components
import EmpBar from '../components/employee/EmpBar';
import PatientDetail from '../components/patient/PatientDetail';
import PatientStatus from '../components/patient/PatientStatus';
import MedicalHistory from '../components/patient/MedicalHistory';
import Order from '../components/outpatient/Order';


const Outpatient = () => {
  // 진료메모 / 치료오더 SELECT 
  const patientDetails = useSelector(state => state.readOutpatientInfo.value[0]);
  // 환자 과거병력 조회 SELECT
  const registrationInfo = useSelector(state => state.readPatientRegistrationInfo.value[1]);

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
                <input value={patientDetails!=null && patientDetails!==undefined? patientDetails.PATIENT_NAME:" "}/>
                <label>주민등록번호</label>
                <input value={patientDetails!=null && patientDetails!==undefined? patientDetails.PATIENT_SSN:" "} />
              </form>
            </div>
          </div>
          <PatientDetail patientDetails={patientDetails}/>
          <MedicalHistory registrationInfo={registrationInfo} />
        </div>
        <PatientStatus className='bottom1'/>
        <Order patientDetails={patientDetails}/>
      </main>
    </div>
  )
}

export default Outpatient;
