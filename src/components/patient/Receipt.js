import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { API_URL } from '../../utils/constants/Config';
// style
import './receipt.scss';

let pageId = {pageId : "1111"};


const Receipt = ({ test , reRender ,setReRender, acceptance, setOutStatusReRender, setWait4payReRender }) => { //비구조할당


  let data = { ADMISSION_ID_PK: test };
  let patientIdPk = acceptance!==null && acceptance!==undefined?acceptance.PATIENT_ID_PK:' ';
  let treatmentNumPk = acceptance!==null && acceptance!==undefined?acceptance.TREATMENT_NUM_PK:' ';

  const [detail, setDetail] = useState([{}]);
  const [acceptanceDetail, setAcceptanceDetail] = useState([{}]);
  const [treatCost, setTreatCost] = useState(0);
  const [careCost, setCareCost] = useState(0);
  const [prescriptionCost, setPrescriptionCost] = useState(0);
  const [timeCost, setTimeCost] = useState(0);
  const [insuranceCost, setInsuranceCost] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  // const detail = useRef([{}]);

  // console.log(JSON.stringify(data.ADMISSION_ID_PK).length);

  useEffect(() => {
    axios.post(API_URL+"/AdmissionReceipt/AdReceipt", JSON.stringify(data), { headers: { "Content-Type": `application/json` }, })
      .then(res => setDetail(res.data));
      // .then(res => detail.current = res.data);
  }, [data.ADMISSION_ID_PK]);

  // console.log((detail.current));
  // console.log("0번째 : "+detail.current[0]);


  useEffect(()=>{
    axios.post("http://localhost:9090/outStatus/getAcceptance", {
      PATIENT_ID_PK: patientIdPk,
      TREATMENT_NUM_PK: treatmentNumPk
      }).then((res) => setAcceptanceDetail(res.data));
  },[patientIdPk, treatmentNumPk]);
  

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

  function success() {
    axios.post("http://localhost:9090/outStatus/insertReceipt", {
      TREATMENT_NUM_FK: treatmentNumPk,
      TREAT_COST: treatCost,
      INSURANCE_COST: insuranceCost,
      CARE_COST: careCost,
      TIME_COST: timeCost,
      PRESCRIPTION_COST: insuranceCost,
      TOTAL_COST: totalCost
      })
    setOutStatusReRender(()=>false);
    setWait4payReRender(()=>false);
  }


  // 처방전 인쇄 후 수납 로직 마무리
  // function preSuccess() { 

  //   axios.post("http://localhost:9090/outStatus/insertReceipt", {
  //     TREATMENT_NUM_FK: treatmentNumPk,
  //     TREAT_COST: treatCost,
  //     INSURANCE_COST: insuranceCost,
  //     CARE_COST: careCost,
  //     TIME_COST: timeCost,
  //     PRESCRIPTION_COST: insuranceCost,
  //     TOTAL_COST: totalCost
  //     })
  //   setOutStatusReRender(()=>false);
  //   setWait4payReRender(()=>false);
  // }

  const OutPatReceipt = () => {

    return (
      <table className="styled-table">
        <thead>
          <tr> 
            <th>처방 내역</th>
            <th>상세 내역</th>
            <th>금 액</th>
          </tr>
        </thead>
        {acceptanceDetail.map((data, index) => (
          <tbody key={index}>
            <tr>
              <td>기본 진료비</td>
              <td>-</td>
              <td>{data.PATIENT_AGE < 7 || data.PATIENT_AGE > 64 ? 5000 : 7000}</td>
              {setTreatCost(data.PATIENT_AGE < 7 || data.PATIENT_AGE > 64 ? 5000 : 7000)}
            </tr>
            <tr>
              <td>치료</td>
              <td>-</td>
              <td>{data.TREATMENT_ORDER === null ? 0 : 10000}</td>
              {setCareCost(data.TREATMENT_ORDER === null ? 0 : 10000)}
            </tr>
            <tr>
              <td>처방전</td>
              <td>-</td>
              <td>{data.MEDICINE === null ? 0 : (data.VISIT === '재진' ? 3000 : 5000)}</td>
              {setPrescriptionCost(data.MEDICINE === null ? 0 : (data.VISIT === '재진' ? 3000 : 5000))}
            </tr>
            <tr>
              <td>접수 시간</td>
              <td>{data.REGISTRATION_TIME}</td>
              <td>-</td>
            </tr>
            <tr>
              <td>시간 할증/할인</td>
              <td>{parseInt(data.REGISTRATION_TIME)<9? '할인' : (parseInt(data.REGISTRATION_TIME)>17 ? '할증' : '-')}</td>
              <td>{parseInt(data.REGISTRATION_TIME)<9 || parseInt(data.REGISTRATION_TIME)>17 ? treatCost * 0.1 : 0}</td>
              {setTimeCost(parseInt(data.REGISTRATION_TIME)<9 || parseInt(data.REGISTRATION_TIME)>17 ? treatCost * 0.1 : 0)}
            </tr>
            <tr>
              <td>보험여부</td>
              <td>{data.INSURANCE === 1 ? 'O' : 'X'}</td>
              <td></td>
            </tr>
            <tr>
              <td>보험할인액</td>
              <td>-</td>
              <td>{data.INSURANCE === 1 ? (treatCost + careCost + prescriptionCost + (parseInt(data.REGISTRATION_TIME)<9 ? - timeCost : timeCost)) * 0.25 : 0}</td>
              {setInsuranceCost(data.INSURANCE === 1 ? (treatCost + careCost + prescriptionCost + (parseInt(data.REGISTRATION_TIME)<9 ? - timeCost : timeCost)) * 0.25 : 0)}
            </tr>
            <tr className="active-row">
              <td>총 수납 금액</td>
              <td>-</td>
              <td>{treatCost + careCost + prescriptionCost + (parseInt(data.REGISTRATION_TIME)<9 ? - timeCost : timeCost) - insuranceCost}</td>
              {setTotalCost(treatCost + careCost + prescriptionCost + (parseInt(data.REGISTRATION_TIME)<9 ? - timeCost : timeCost) - insuranceCost)}
            </tr>

          </tbody>
        ))}
      </table>
    )
  }


  return (
    <div className='receipt'>
      <p className='section-title'>수납</p>
      <div className='content-box'>
        {pageId.pageId === "qwer"?
        <>
          <AdmissionList /> 
          {detail.length === 0 ? "" : <button onClick={() => {complete()}} className='btn'>수납</button>}
        </>
        :
        <>
          <OutPatReceipt />
          {acceptanceDetail.length === 0 ? "" : <button onClick={() => {success()}} className='btn'>수납</button>}
        </>
        }
      
      </div>
    </div>
  )
}

export default Receipt;