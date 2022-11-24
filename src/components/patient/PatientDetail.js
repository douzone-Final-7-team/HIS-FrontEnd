import axios from 'axios';
import React, { useEffect, useState } from 'react'
// style
import './patientDetail.scss';


const PDetail = ({patient, data, setEmpId, symptom, setSymptom, setSpecialityName}) => {
  const [doctorList, setDoctorList] = useState();
  const [speciality, setSpeciality] = useState('내과');

  useEffect(()=>{
    axios.post("http://43.200.169.159:9090/outStatus/doctorList", {
      SPECIALITY_ID_FK: (speciality == '내과' ? 'N' : speciality == '이비인후과' ? 'E' : speciality == '정형외과' ? 'J' : ' ') 
      }).then((res)=>{
        setDoctorList(res.data);
        setEmpId(res.data[0].EMP_NAME+'('+res.data[0].EMP_ID_PK+')');
      });
  },[speciality]);


  return (
    <div className='patient-detail'>
      <table>
        <tbody>
          <tr>
            <th className='devide1 border-left'>S/A</th>
            {/* <td className='devide1'>{patient.}</td> */}
            <td className='devide1'>{data!=null && data!=undefined? data.GENDER:" "} / {data!=null && data!=undefined? data.PATIENT_AGE:" "}</td>
            <th className='devide1'>Tel</th>
            <td>{data!=null && data!=undefined? data.PATIENT_TEL:" "}</td>
            <th className='devide1'>진료과</th>
            <td>
              <select onChange={(e) => {
                setSpeciality(e.target.value);
                setSpecialityName(e.target.value);
              }}>
                <option>내과</option>
                <option>이비인후과</option>
                <option>정형외과</option>
              </select>
            </td>
            <th className='devide1'>담당의</th>
            <td>
              <select onChange={(e) => {
                setEmpId(e.target.value);
              }}>
              {doctorList!=null && doctorList!=undefined? doctorList.map((data, index) => (
                  <option defaultValue={data.EMP_NAME} key={index}>{data.EMP_NAME}({data.EMP_ID_PK})</option>
            )) : 
             ''
            }
              </select>
            </td>
            <th className='devide1'>보험유무</th>
            <td className='devide1'>{data!=null && data!=undefined? (data.INSURANCE == 0 ? 'X':'O') : " "}</td>
            <th className='devide1'>진료구분</th>
            <td className='devide1'>{data!=null && data!=undefined? (data.treatmentInfo.length == 0 ? '초진':'재진') : " "}</td>
          </tr>
          <tr>
            <th colSpan={3}>주소</th>
            <td colSpan={9}>{data!=null && data!=undefined? data.PATIENT_ADDR:" "}</td>
          </tr>
          <tr>
            <th colSpan={3}>증상</th>
            <td colSpan={9}><input value={symptom || ""} onChange={(e)=> {
              setSymptom(e.target.value)
            }}/></td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default PDetail