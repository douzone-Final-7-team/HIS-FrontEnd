import React from 'react'
// style
import './receipt.scss';

const Receipt = () => {
  return (
    <div className='receipt'>
      <p className='section-title'>수납</p>
      <div className='content-box'>
        <table class="styled-table">
          <thead>
            <tr>
                <th>처방내역</th>
                <th>금액</th>
            </tr>
          </thead>
          <tbody>
            <tr>
                <td>기본진료</td>
                <td>7,000</td>
            </tr>
            <tr>
                <td>치료</td>
                <td>10,000</td>
            </tr>
            <tr>
                <td>약처방</td>
                <td>3,000</td>
            </tr>
            <tr>
                <th>보험여부</th>
                <th>할인금액</th>
            </tr>
            <tr>
                <td>보험</td>
                <td>- 4,350</td>
            </tr>
            <tr class="active-row">
                <td>총 수납 금액</td>
                <td>00,000</td>
            </tr>
          </tbody>
        </table>
        <a href='#!' className='btn'>수납</a>
      </div>
    </div>
  )
}

export default Receipt;
