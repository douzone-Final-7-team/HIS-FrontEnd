import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Calendar from 'react-calendar';
// style
import '../styles/scss/reset.scss';
import '../styles/doctor.scss';
import '../styles/Calendar.css';

// components
import EmpBar from '../components/employee/EmpBar';
import ReducedPatientStatus from '../components/patient/ReducedPatientStatus';


const Doctor = () => {

  const [value, onChange] = useState(new Date());
  const [inPatientList, setInPatientList] = useState([{}]);
  const [pastTreatmentList, setPastTreatmentList] = useState([{}]);
  const [diagnosis, setDiagnosis] = useState("");
  const [treatmentMemo, setTreatmentMemo] = useState("");
  const [treatmentOrder, setTreatmentOrder] = useState("");
  const [medicineOrder, setMedicineOrder] = useState("");
  const [admissionOrder, setAdmissionOrder] = useState(""); 
  const [detail, setDetail] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:9090/AdmissionFront/myInPatient")
      .then((res) => {
        setInPatientList(res.data)
      });

    axios.get("http://localhost:9090/patient/pastTreatmentList")
      .then((res) => {
        setPastTreatmentList(res.data)
      });

  }, []);

  const data = {
    diagnosis: diagnosis,
    treatmentMemo: treatmentMemo,
    treatmentOrder: treatmentOrder,
    medicineOrder: medicineOrder,
    admissionOrder: admissionOrder
  }

  const sendMedicalCharts = () => {
    axios.post("http://localhost:9090/treatmentOrder/treatmentDone", JSON.stringify(data),
    {
      headers: {
        "Content-Type" : `application/json`,
      },
    })
    .then((res)=>{
      console.log(res);
    })
  }

  return (
    <div className='doctor'>
      <main className='main'>
        <div className='top'>
          <EmpBar />
        </div>
        <div className='infoBox'>
          <span className='infoName'>이름 : </span><input className='nameInput' value="배병서"/>
          <span className='infoSsn'>주민등록번호 : </span><input className='ssnInput' value="970721-1865467"/>
          <div className='dropdown'>
            <a href='#!'className='btn'>과거병력</a>
            <div className='dropdown-submenu'>
              <div className='dropdown-box'>
                <table className='dropdown-table'>
                  <tr>
                    <th>진료 일자</th>
                    <th>진단명</th>
                    <th>처방 및 치료 내역</th>
                  </tr>
                  {pastTreatmentList.map((data)=> (
                    <tr>
                      <td>{data.TREATMENT_DATE}</td>
                      <td>{data.DIAGNOSTIC_NAME}</td>
                      <td><button onClick={() => setDetail(!detail)}>상세기록</button></td>
                    </tr>
                  ))}
                </table>
              </div>
            </div>
          </div>
      
          <table className='infoTable'>
            <tr>
              <th className='devide1'>S/A</th>
              <td className='devide1'><input value="M/26"/></td>
              <th className='devide1'>TEL</th>
              <td><input value="010-2227-1396"/></td>
              <th className='devide1'>진료과</th>
              <td><input value="해당 진료과"/></td>
              <th className='devide1'>보험유무</th>
              <td><input value="O"/></td>
              <th className='devide1'>진료구분</th>
              <td><input value="재진"/></td>
            </tr>
            <tr>
              <th colSpan={2}>증상</th>
              <td colSpan={10}><input value="존나 아프다" /></td>
            </tr>
          </table>
        </div>
        <div className='item2'>
          <div>
            <Calendar onChange={onChange} value={value}
            formatDay={(locale, value) => 
              value.toLocaleDateString("en", {day: "numeric"})
            }
            />
          </div>
        </div>
        <div className='admissionBox'>
          <span className='admissionTitle'>입원 내역</span>
          <div className='line'></div>
          <table className='admissionTb'>
            <tr>
              <th className='admissionTh'>환자번호</th>
              <th className='admissionTh'>환자이름</th>
              <th className='admissionTh'>S/A</th>
              <th className='admissionTh'>입실일자</th>
              <th className='admissionTh'>담당 의사</th>
              <th className='admissionTh'>병실</th>
            </tr>
            {inPatientList.map((data) => (
              <tr>
                <td className='admissionTd'>{data.PATIENT_ID_FK}</td>
                <td className='admissionTd'>{data.PATIENT_NAME}</td>
                <td className='admissionTd'>{data.GENDER}/{data.PATIENT_AGE}</td>
                <td className='admissionTd'>{data.ADMISSION_DATE}</td>
                <td className='admissionTd'>{data.EMP_NAME}</td>
                <td className='admissionTd'>{data.ROOM_NUM}</td>
              </tr>
            ))}
          </table>
        </div>
        <div className='treatment-box'>
          <span className='box-title'>진료 기록</span>
          <div className='line'></div>
          <form className='treatment-form'> 

            <div className='devide'>

              <div className='order-div'>

                <div className='case-div'><span>병 &nbsp;&nbsp;&nbsp;명</span> 
                    <input 
                      className='name-input' 
                      placeholder='병명을 입력해주세요.' 
                      onChange={(e) => {
                        setDiagnosis(e.target.value);
                      }} />

                    <div className='order-checkbox'>
                      <span className='form-span'>오 &nbsp;&nbsp;&nbsp;더</span>
                      <input className='treatment-checkbox' type="checkbox" /> <span className='checkbox-span'>치료</span> 
                      <input className='medicine-checkbox' type="checkbox" /> <span className='checkbox-span'>약</span>
                      <input className='admission-checkbox' type="checkbox" /> <span className='checkbox-span'>입원 여부</span>
                    </div>
                </div>

                <div className='order-detail'>
                  <div className='treatment-detail'>
                    <span>치료 처방</span> <br /> 
                    <textarea 
                      onChange={(e) => {
                        setTreatmentOrder(e.target.value);
                      }}
                    />
                  </div>

                  <div className='medicine-detail'>
                    <span>약 처방</span> <br /> 
                    <textarea 
                      onChange={(e) => {
                        setMedicineOrder(e.target.value);
                      }}
                    />
                  </div>
                  
                  <div className='admission-detail'>
                    <span>입원 오더</span> <br /> 
                    <textarea 
                      onChange={(e) => {
                        setAdmissionOrder(e.target.value);
                      }}
                    />
                  </div>
                </div>
              </div>  

            </div>

            <div className='memo-div'>
              <span className='form-span'>진료 메모</span> <br /><br /> 
              <textarea 
                onChange={(e) => {
                  setTreatmentMemo(e.target.value);
                }}
              />
            </div>
            <a 
              href='#!' 
              className='btn' 
              onClick={(e) => {
                sendMedicalCharts();
            }}>완료</a>
          </form>
        </div>
        <ReducedPatientStatus />
      </main>
    </div>

  )
}

export default Doctor
