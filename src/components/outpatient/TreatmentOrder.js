import React from 'react'

const TreatmentOrder = () => {
  return (
    <div>
      <div id="tab-treatment-order">
        <p className="icon-title">
          <span className="icon">&gt;</span><span className="task-title">치료오더</span>
        </p>
        <table className='styled-table'>
          <thead>
            <tr>
              <th></th>
              <th>체크</th>
              <th>분류</th>
              <th>처방내역</th>
              <th>비고</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>
                <input type="checkbox"/>
              </td>
              <td>기본</td>
              <td>경구식이 시작</td>
              <td>-</td>
            </tr>
            <tr>
              <td>2</td>
              <td><input type="checkbox"/></td>
              <td>주사/수액</td>
              <td>수액 뭐머 놔주세요</td>
              <td>-</td>
            </tr>
            <tr>
              <td>3</td>
              <td><input type="checkbox" /></td>
              <td>내복약</td>
              <td>경구식이 시작</td>
              <td>-</td>
            </tr>
          </tbody>
        </table>
        <p className='btn-tbl'><a href='#!' className='btn'>완료</a></p>
      </div>
    </div>
  )
}

export default TreatmentOrder
