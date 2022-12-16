import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { API_URL } from '../../utils/constants/Config';
import io from 'socket.io-client';
// style
import './receipt.scss';
import '../modalReception/PrescriptionPrint';
import PrescriptionPrint from '../modalReception/PrescriptionPrint';
import Modal from '../modalReception/Modal';
import BillPaper from '../modalReception/BillPaper';
import { alertSweetError, alertSweetSuccess } from '../higher-order-function/Alert';

const socket = io.connect('http://192.168.0.195:3001');

const role = window.localStorage.getItem('role');

const Receipt = ({ selectRoom,test, reRender ,setReRender, acceptance, setOutStatusReRender, setWait4payReRender, treatmentNumPk, setAcceptance}) => { //비구조할당
  
  let data;
  if((test !== null && test !=="" && test !==undefined) || (selectRoom !== null && selectRoom !== ""&&selectRoom!==undefined)){
    if(test.length !== 0){
      // setSelectRoom("");
      data = {
        ADMISSION_ID_PK : test
      }
      data = JSON.stringify(data);
    }else if(selectRoom.length !== 0){
      // setTest("");
      data = selectRoom
    }else{
      data = {
        ADMISSION_ID_PK : test
      }
    }
  }else{
    data = {
      ADMISSION_ID_PK : test
    }
  }
  

  // console.log("데이터들어왓다~~ : "+data);

  const [detail, setDetail] = useState([{}]);
  const [prescriptionPrint, setPrescriptionPrint] = useState(false);
  const btnChange = useRef();
  const [specialityId ,  setSpecialityId] = useState("");
  const [prescriptionData, setPrescriptionData] = useState([{}]);
  const [room, setRoom] = useState("");
  const [test3, setTest3] = useState(false);
  const [billData, setBillData] = useState(false);
  const [billCompleteData,setBillCompleteData] = useState([{}]);

  

  useEffect(()=>{
    setRoom("out")

    if (room !== "") {
      // 프론트에서 백엔드로 데이터 방출 join_room id로 백에서 탐지 가능
      // 2번째 인자인 room은 방이름이며 백에선 data매게변수로 받는다
      socket.emit("join_room", room);
  }
  },[room])

  useEffect(() => {
    axios.post(API_URL+"/AdmissionReceipt/AdReceipt", data, { headers: { "Content-Type": `application/json` }, })
      .then(res => setDetail(res.data));
      // .then(res => detail.current = res.data);
  }, [data]);

  // console.log((detail.current));
  // console.log("0번째 : "+detail.current[0]);

  useEffect(()=> {
    if(role !== "ROLE_INRECEIPT" && acceptance.SPECIALITY !== undefined && acceptance.SPECIALITY !== null && acceptance.SPECIALITY !== '') {
    setSpecialityId(acceptance.SPECIALITY === '내과' ? 'N' : acceptance.SPECIALITY === '이비인후과' ? 'E' : acceptance.SPECIALITY === '정형외과' ? 'J' : ' ');
  }
   
},[acceptance])

  const AdmissionList = () => {
    console.log("디테일 랭스 : "+detail);

    return (
      <table className="styled-table">
        <thead>
          <tr>
            <th>입원 내역</th>
            <th>상세 내역</th>
            <th>금 액</th>
          </tr>
        </thead>
        {detail.length!==0 && detail.map((detailEle) => (
          <tbody>
            <tr>
              <td>입원시작일</td>
              <td>{detailEle.ADMISSION_DATE}</td>
              <td>-</td>
            </tr>
            <tr>
              <td>중간 수납일</td>
              <td>{detailEle.MIDDLE_PAY_DATE}</td>
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
  
  function completeAxios(){
    axios.post(API_URL+"/AdmissionReceipt/getBillData", {ADMISSION_ID_PK:detail[0].ADMISSION_ID_PK}, { headers: { "Content-Type": `application/json` }, })
    .then(res => setBillCompleteData(()=>res.data)) 

    console.log("퇴원일: "+billCompleteData);
    let result = reRender;
    if(result === true){
      result = false;
    }else if(result===false){
      result = true;
    }

    
    setBillData(()=>detail[0]);
    setReRender(result);
    setTest3(true);
    
  }

  function complete(){
    //모달 띄워서 영수증 출력 여부 확인하기.
    
    console.log("오케이 : "+detail[0].ADMISSION_ID_PK);

    axios.post(API_URL+"/AdmissionReceipt/AdReceiptComplete", JSON.stringify(detail[0]), {headers:{"Content-Type" : `application/json`},})
    .then((res) => {res.data==="success"? alertSweetSuccess("승인","수납이완료되었습니다.",completeAxios):alertSweetError("거부","수납처리에 실패하였습니다.");
    });
    
    
    
    
    
    
  }

  
  

  function success() {
    axios.post("http://192.168.0.195:9090/outStatus/insertReceipt", {
      TREATMENT_NUM_FK: treatmentNumPk,
      TREAT_COST: acceptance.treatCost,
      INSURANCE_COST: acceptance.insuranceCost,
      CARE_COST: acceptance.careCost,
      TIME_COST: acceptance.timeCost,
      PRESCRIPTION_COST: acceptance.prescriptionCost,
      TOTAL_COST: acceptance.totalCost
      })
    setOutStatusReRender(()=>false);
    // setWait4payReRender(()=>false);
    setAcceptance([{}]);
    socket.emit("sunab_complete" , {outpatient : room , SPECIALITY_ID_PK : specialityId});
  }

  
  function successNprint() {
    if(btnChange.current.value === "처방전") {
      axios.post("http://192.168.0.195:9090/outStatus/getPrescription", {
        TREATMENT_NUM_PK: treatmentNumPk
      }).then((res)=>setPrescriptionData(res.data[0]));

      axios.post("http://192.168.0.195:9090/outStatus/insertReceipt", {
        TREATMENT_NUM_FK: treatmentNumPk,
        TREAT_COST: acceptance.treatCost,
        INSURANCE_COST: acceptance.insuranceCost,
        CARE_COST: acceptance.careCost,
        TIME_COST: acceptance.timeCost,
        PRESCRIPTION_COST: acceptance.prescriptionCost,
        TOTAL_COST: acceptance.totalCost
        });
      setOutStatusReRender(()=>false);
      setWait4payReRender(()=>false);
      setAcceptance([{}]);
      setPrescriptionPrint(!prescriptionPrint);
    }
    btnChange.current.value = "처방전";
  }
  

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
        {acceptance.length===1?'':
          <tbody>
            <tr>
              <td>기본 진료비</td>
              <td>-</td>
              <td>{acceptance.treatCost}</td>
            </tr>
            <tr>
              <td>치료</td>
              <td>-</td>
              <td>{acceptance.careCost}</td>
            </tr>
            <tr>
              <td>처방전</td>
              <td>-</td>
              <td>{acceptance.prescriptionCost}</td>
            </tr>
            <tr>
              <td>접수 시간</td>
              <td>{acceptance.REGISTRATION_TIME}</td>
              <td>-</td>
            </tr>
            <tr>
              <td>시간 할증/할인</td>
              <td>{parseInt(acceptance.REGISTRATION_TIME)<9? '할인' : (parseInt(acceptance.REGISTRATION_TIME)>17 ? '할증' : '-')}</td>
              <td>{acceptance.timeCost}</td>
            </tr>
            <tr>
              <td>보험여부</td>
              <td>{acceptance.INSURANCE === 1 ? 'O' : 'X'}</td>
              <td></td>
            </tr>
            <tr>
              <td>보험할인액</td>
              <td>-</td>
              <td>{acceptance.insuranceCost}</td>
            </tr>
            <tr className="active-row">
              <td>총 수납 금액</td>
              <td>-</td>
              <td>{acceptance.totalCost}</td>
            </tr>

          </tbody>
        }
      </table>
    )
  }

  return (
    <div className='receipt'>
      {prescriptionPrint && (
        <Modal closeModal={() => setPrescriptionPrint(!prescriptionPrint)}>
          <PrescriptionPrint prescriptionData={prescriptionData} setPrescriptionPrint={setPrescriptionPrint} acceptance={acceptance}/>
        </Modal>
      )}
      {test3 && (
        <Modal closeModal={() => setTest3(!test3)}>
          <BillPaper setTest3={setTest3} billData={billData} billCompleteData={billCompleteData}/>
        </Modal>
      )}
      {test3 && (
        <Modal closeModal={() => setTest3(!test3)}>
          <BillPaper setTest3={setTest3} billData={billData} billCompleteData={billCompleteData}/>
        </Modal>
      )}
      <p className='section-title'>수납</p>
      <div className='content-box'>
        {role === "ROLE_INRECEIPT" ?
        <>
          <AdmissionList /> 
          {detail.length === 0 ? "" : <button onClick={() => {complete()}} className='btn'>수납</button>}
        </>
        :
        <>
          <OutPatReceipt />
          {acceptance.length === 1 ? "" : (acceptance.MEDICINE !== null ? <input type="button" ref={btnChange} onClick={() => {successNprint()}} className='btn' value="수납"/> : <input type="button" onClick={() => {success()}} className='btn' value="수납"/>)}
        </>
        }
      
      </div>
    </div>
  )
}

export default Receipt;