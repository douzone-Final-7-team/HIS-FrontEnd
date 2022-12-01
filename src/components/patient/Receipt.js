import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { API_URL } from '../../utils/constants/Config';
// style
import './receipt.scss';


const Receipt = ({ test , reRender ,setReRender }) => { //비구조할당


  let data = { ADMISSION_ID_PK: test };

  const [detail, setDetail] = useState([{}]);
  
  // console.log(typeof reRender);

  // console.log(JSON.stringify(data.ADMISSION_ID_PK).length);

  useEffect(() => {
    axios.post(API_URL+"/AdmissionReceipt/AdReceipt", JSON.stringify(data), { headers: { "Content-Type": `application/json` }, })
      .then(res => setDetail(res.data));
      // .then(res => detail.current = res.data);
  }, [data.ADMISSION_ID_PK]);

  // console.log((detail.current));
  // console.log("0번째 : "+detail.current[0]);

  const AdmissionList = () => {

    return (
      <table className="styled-table">
        <thead>
          <tr>
            <th>입원 내역</th>
            <th>상세 내역</th>
            <th>금 액</th>
          </tr>
        </thead>
        {detail.map((detailEle) => (
          <tbody>
            <tr>
              <td>입원시작일</td>
              <td>{detailEle.ADMISSION_DATE}</td>
              <td>-</td>
            </tr>
            <tr>
              <td>퇴원예정일</td>
              <td>{detailEle.DISCHARGE_DUEDATE}</td>
              <td>-</td>
            </tr>
            <tr>
              <td>총 입원일</td>
              <td>{detailEle.ADMISSION_TOTAL_DAY}</td>
              <td>-</td>
            </tr>
            <tr>
              <td>입원 금액</td>
              <td>-</td>
              <td>{parseInt(detailEle.ADMISSION_TOTAL_DAY) * 50000}</td>
            </tr>
            <tr>
              <td>보험여부</td>
              <td>{parseInt(detailEle.INSURANCE_COST) === 0 ? "X" : "O"}</td>
              <td>-</td>
            </tr>
            <tr>
              <td>보험할인액</td>
              <td>-</td>
              <td>{parseInt(detailEle.INSURANCE_COST) === 0 ? "0" : "-" + detailEle.INSURANCE_COST}</td>
            </tr>
            <tr className="active-row">
              <td>총 수납 금액</td>
              <td>-</td>
              <td>{detailEle.TOTAL_COST}</td>
            </tr>

          </tbody>
        ))}
      </table>
    )
  }

  function complete(){
    let result = reRender;
   console.log("resutl : "+ result); 
    if(result === true){
    // if(result.){
      result = false;
    }else if(result===false){
      result = true;
    } 
    // console.log(sunabList[index].ADMISSION_ID_PK);
    axios.post(API_URL+"/AdmissionReceipt/AdReceiptComplete", JSON.stringify(detail[0]), {headers:{"Content-Type" : `application/json`},})
    .then(setReRender(()=>result));
    
    // .then(res => setDetail(res.data))
    // 리턴으로 성공 실패 여부 받아서 다음 처리
    
  }

  return (
    <div className='receipt'>
      <p className='section-title'>수납</p>
      <div className='content-box'>
        <AdmissionList />
        {detail.length === 0 ? "" : <button onClick={() => {complete()}} className='btn'>수납</button>}

      </div>
    </div>
  )
}

export default Receipt;
