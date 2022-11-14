import React, { useState } from 'react'
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
                    <td><button>상세기록</button></td>
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
            <Calendar onChange={onChange} value={value} />
          </div>
        </div>
        <div className='admissionBox'>
          <span className='admissionTitle'>입원 내역</span>
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
            <tr>
              <td className='admissionTd'>000001</td>
              <td className='admissionTd'>배병서</td>
              <td className='admissionTd'>M/26</td>
              <td className='admissionTd'>2022-10-21</td>
              <td className='admissionTd'>황동화 교수</td>
              <td className='admissionTd'>501</td>
            </tr>
            <tr>
              <td className='admissionTd'>000001</td>
              <td className='admissionTd'>배병서</td>
              <td className='admissionTd'>M/26</td>
              <td className='admissionTd'>2022-10-21</td>
              <td className='admissionTd'>황동화 교수</td>
              <td className='admissionTd'>501</td>
            </tr>
            <tr>
              <td className='admissionTd'>000001</td>
              <td className='admissionTd'>배병서</td>
              <td className='admissionTd'>M/26</td>
              <td className='admissionTd'>2022-10-21</td>
              <td className='admissionTd'>황동화 교수</td>
              <td className='admissionTd'>501</td>
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
        <div className='item4'>치료오더</div>
        <ReducedPatientStatus />
      </main>
    </div>

  )
}

export default Doctor
