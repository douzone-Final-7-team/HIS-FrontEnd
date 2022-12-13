import './acceptance.scss';

const Acceptance = () => {
  return (
    <div className="receipt-wrap">
      <h1>영수증</h1>
      <div className="receipt-top">
        <div>
          <p>더존 병원</p>
        </div>
        <div><p>2022-12-12 15:13:00</p></div>
      </div>
      <table className="styled-table">
        <thead>
          <tr> 
            <th>처방 내역</th>
            <th>상세 내역</th>
            <th>금 액</th>
          </tr>
        </thead>
          <tbody>
            <tr>
              <td>기본 진료비</td>
              <td>-</td>
              <td>7000</td>
            </tr>
            <tr>
              <td>치료</td>
              <td>-</td>
              <td>10000</td>
            </tr>
            <tr>
              <td>처방전</td>
              <td>-</td>
              <td>3000</td>
            </tr>
            <tr>
              <td>시간 할증/할인</td>
              <td>할인</td>
              <td>-700</td>
            </tr>
            <tr>
              <td>보험여부</td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>보험할인액</td>
              <td>-</td>
              <td>-4835</td>
            </tr>
            <tr className="total">
              <td>Total</td>
              <td>-</td>
              <td>15545</td>
            </tr>
          </tbody>
      </table>
      <p>거래일시 : 2022-12-12 15:13:00</p>
  </div>
  )
}

export default Acceptance;
