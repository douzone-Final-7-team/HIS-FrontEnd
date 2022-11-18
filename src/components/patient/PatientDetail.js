import React from 'react'
// style
import './patientDetail.scss';

const PDetail = ({patient}) => {

  return (
    <div className='patient-detail'>
      <table>
        <tbody>
          <tr>
            <th className='devide1 border-left'>S/A</th>
            {/* <td className='devide1'>{patient.}</td> */}
            <td className='devide1'><input/></td>
            <th className='devide1'>Tel</th>
            <td><input/></td>
            <th className='devide1'>진료과</th>
            <td>
              <select>
                <option>내과</option>
                <option>이비인후과</option>
                <option>정형외과</option>
              </select>
            </td>
            <th className='devide1'>담당의</th>
            <td>
              <select>
                <option>김의사</option>
                <option>이의사</option>
                <option>최의사</option>
              </select>
            </td>
            <th className='devide1'>보험유무</th>
            <td className='devide1'><input placeholder='O/X'/></td>
            <th className='devide1'>진료구분</th>
            <td className='devide1'>초/재진</td>
          </tr>
          <tr>
            <th colSpan={3}>주소</th>
            <td colSpan={9}><input placeholder='주소 입출력' /></td>
          </tr>
          <tr>
            <th colSpan={3}>증상</th>
            <td colSpan={9}><input placeholder='증상 입출력'/></td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default PDetail
