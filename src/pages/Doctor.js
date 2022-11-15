import React, { useState } from 'react'
import Calendar from 'react-calendar';
// style
import '../styles/scss/reset.scss';
import '../styles/doctor.scss';
import '../styles/Calendar.css';
import '../components/modal/modal.scss';
// components
import EmpBar from '../components/employee/EmpBar';
import ReducedPatientStatus from '../components/patient/ReducedPatientStatus';
import Modal from '../components/modal/Modal';
import PatientDetailModal from '../components/modal/PatientDetailModal';

const Doctor = () => {
  const [value, onChange] = useState(new Date());
  const [detail, setDetail] = useState(false);
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
                  <tr>
                    <td>2022-11-14</td>
                    <td>위염</td>
                    <td><button onClick={() => setDetail(!detail)}>상세기록</button></td>
                  </tr>
                  <tr>
                    <td>2022-11-14</td>
                    <td>위염</td>
                    <td><button>상세기록</button></td>
                  </tr>
                  <tr>
                    <td>2022-11-14</td>
                    <td>위염</td>
                    <td><button>상세기록</button></td>
                  </tr>

                </table>
              </div>
            </div>
          </div>
          {detail && (
                      <Modal closeModal={() => setDetail(!detail)}>
                        <PatientDetailModal />
                      </Modal>
                    )}
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
            <tr>
              <td className='admissionTd'>000001</td>
              <td className='admissionTd'>배병서</td>
              <td className='admissionTd'>M/26</td>
              <td className='admissionTd'>2022-10-21</td>
              <td className='admissionTd'>황동화 교수</td>
              <td className='admissionTd'>501</td>
            </tr>
          </table>
        </div>
        <div className='treatment-box'>
          <span className='box-title'>진료 기록</span>
          <div className='line'></div>
          <form className='treatment-form'> <br /> <br />
          <div className='case-div'><span>병 &nbsp;&nbsp;&nbsp;명</span> <input className='name-input' placeholder='병명을 입력해주세요.'/></div> <br />
            <div className='devide'>
              <div className='order-div'><span className='form-span'>오 &nbsp;&nbsp;&nbsp;더</span>
                <input className='treatment-checkbox' type="checkbox" /> <span className='checkbox-span'>치료</span> 
                <input className='medicine-checkbox' type="checkbox" /> <span className='checkbox-span'>약</span>
                <input className='admission-checkbox' type="checkbox" /> <span className='checkbox-span'>입원 여부</span>

                <div className='order-detail'>
                  <div className='treatment-detail'><span>치료 처방</span> <br /> <input /></div>
                  <div className='medicine-detail'><span>약 처방</span> <br /> <input /></div>
                  <div className='admission-detail'><span>입원 오더</span> <br /> <input /></div>
                </div>
              </div>
            </div>
            <div className='memo-div'><span className='form-span'>진료 메모</span> <br /> <br /><input className='memo-input' type={"text"}/></div>
            <a href='#!' className='btn'>완료</a>
          </form>
        </div>
        <ReducedPatientStatus />
      </main>
    </div>

  )
}

export default Doctor
