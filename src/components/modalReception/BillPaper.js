
import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';


// style
import './BillPaper.scss';

const BillPaper = ({setTest3,billData,billCompleteData}) => {


  

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: 'prescription',
    onAfterPrint: ()=> setTest3(false)
  });

  return (
    
      <div>
        <div className="prescription-wrapper2" ref={componentRef}>
          <div className="prescription-content">
            <p className='insurance-target'>( 건강보험 ) 피보험자: <span></span> </p>
            <table>
              <tbody>
                <tr><th colSpan={13} className="prescription-title">입원(퇴원/중간) 진료비 계산서,영수증</th></tr>
                <tr className="align-box">
                  <th colSpan={7} className="align1 thick">환자 등록 번호</th>
                  <th colSpan={1} className="align1 thick">환자 성명</th>
                  {/* <th className="text-mode thick">의료기관</th> */}
                  <th colSpan={2} className="align2 thick">진료기간</th>
                  {/* <th colSpan={2} className="align1 thick">명 &nbsp;&nbsp; 칭</th> */}
                  <th colSpan={3} className="align3 thick">야간(공휴일)진료</th>
                </tr>
                <tr className="align-box">
                  <td colSpan={7} className="align1">{billData.PATIENT_ID_PK && billData.PATIENT_ID_PK}</td>
                  <td colSpan={1} className="align1">{billData.PATIENT_NAME && billData.PATIENT_NAME}</td>
                  <td colSpan={2} className="align1">{billData.ADMISSION_DATE && billData.ADMISSION_DATE} ~ {billCompleteData[0].DISCHARGE_DATE === null ? billCompleteData[0].MIDDLE_PAY_DATE : billCompleteData[0].DISCHARGE_DATE}</td>
                  <td colSpan={3}>해당없음</td>
                </tr>
                <tr className="align-box">
                  <th colSpan={7} className="align3 thick">진료과</th>
                  <th colSpan={1} className="align1 thick">병 명</th>
                  <th colSpan={1} className="align1 thick">병 실</th>
                  <th colSpan={1} className="align1 thick">환자 구분</th>
                  <th colSpan={3} className="align2 thick">영수증 번호</th>
                </tr>
                <tr className="align-box">
                  <td colSpan={7} >{billData.SPECIALITY && billData.SPECIALITY}</td>
                  <td colSpan={1} >{billData.DIAGNOSIS && billData.DIAGNOSIS}</td>
                  <td colSpan={1} >{parseInt(billData.ward)+parseInt(billData.room_num)+"-"+billData.bed_num}</td>
                  <td colSpan={1} >입 원</td>
                  <td colSpan={3}>{billCompleteData[0].INRECEIPT_ID_PK}</td>
                </tr>
                
                <tr className="align-box">
                  <th colSpan={7} className="align1 thick">항목</th>
                  <th colSpan={1} className="align1 thick">요양급여</th>
                  <th colSpan={1} className="align1 thick">비급여</th>
                  <td colSpan={4} className="align1 thick">금액산정내역</td>
                </tr>
                <tr className="align-box">
                  <td rowSpan={5} className="thick text-mode">필수항목</td>
                  <td colSpan={6} >진찰료</td>
                  <td colSpan={1} >-</td>
                  <td colSpan={1} >-</td>
                  <td colSpan={1} rowSpan={2} >진료비 총액</td>
                  <td colSpan={1} rowSpan={2}>{parseInt(billData.TOTAL_COST)+parseInt(billData.INSURANCE_COST)}</td>
                </tr>
                <tr className="align-box">
                  {/* <th rowSpan={4} className="align0 thick text-mode">필수항목</th> */}
                  <td colSpan={6} >입원료</td>
                  <td colSpan={1} >-</td>
                  <td colSpan={1} >{parseInt(billData.TOTAL_COST)+parseInt(billData.INSURANCE_COST)}</td>
                </tr>
                <tr className="align-box">
                  {/* <th rowSpan={4} className="align0 thick text-mode">필수항목</th> */}
                  <td colSpan={6} >식 대</td>
                  <td colSpan={1} >-</td>
                  <td colSpan={1} >-</td>
                  <td colSpan={1} rowSpan={2}>환자부담금</td>
                  <td colSpan={1} rowSpan={2}>{billData.TOTAL_COST}</td>
                </tr>
                <tr className="align-box">
                  {/* <th rowSpan={4} className="align0 thick text-mode">필수항목</th> */}
                  <td colSpan={6} >주사료</td>
                  <td colSpan={1} >-</td>
                  <td colSpan={1} >-</td>
                </tr>
                <tr className="align-box">
                  {/* <th rowSpan={4} className="align0 thick text-mode">필수항목</th> */}
                  <td colSpan={6} >검사료</td>
                  <td colSpan={1} >-</td>
                  <td colSpan={1} >-</td>
                  <td colSpan={2} rowSpan={7} className="align0">비 고</td>
                  
                </tr>
                <tr className="align-box">
                  <td rowSpan={3} className="thick text-mode">선택항목</td>
                  <td colSpan={6} >선택</td>
                  <td colSpan={1} >-</td>
                  <td colSpan={1} >-</td>
                  
                </tr>
                <tr className="align-box">
                  {/* <th rowSpan={4} className="align0 thick text-mode">필수항목</th> */}
                  <td colSpan={6} ></td>
                  <td colSpan={1} ></td>
                  <td colSpan={1} ></td>
                  
                </tr>
                <tr className="align-box">
                  {/* <th rowSpan={4} className="align0 thick text-mode">필수항목</th> */}
                  <td colSpan={6} ></td>
                  <td colSpan={1} ></td>
                  <td colSpan={1} ></td>
                  
                </tr>
                <tr className="align-box">
                  {/* <th rowSpan={4} className="align0 thick text-mode">필수항목</th> */}
                  <td colSpan={7}>합 계</td>
                  <td colSpan={1}>{parseInt(billData.TOTAL_COST)+parseInt(billData.INSURANCE_COST)}</td>
                  <td colSpan={1}>-</td>
                  
                </tr>
                <tr className="align-box">
                  {/* <th rowSpan={4} className="align0 thick text-mode">필수항목</th> */}
                  <td colSpan={7}>본인부담금</td>
                  <td colSpan={1}>{billData.TOTAL_COST}</td>
                  <td colSpan={1}>-</td>
                  
                </tr>
                <tr className="align-box">
                  {/* <th rowSpan={4} className="align0 thick text-mode">필수항목</th> */}
                  <td colSpan={7}>보험할인금</td>
                  <td colSpan={1}>{billData.INSURANCE_COST}</td>
                  <td colSpan={1}>-</td>
                  
                </tr>
                <tr className="align-box">
                  {/* <th rowSpan={4} className="align0 thick text-mode">필수항목</th> */}
                  <td colSpan={7} >사업자등록번호</td>
                  <td colSpan={1} >198756596</td>
                  <td colSpan={1}>사업장소재지</td>
                  <td colSpan={2}>부산광역시 해운대구 센텀중앙로 79</td>
                </tr>
                <tr className="align-box">
                  {/* <th rowSpan={4} className="align0 thick text-mode">필수항목</th> */}
                  <td colSpan={7} >상 호 명</td>
                  <td colSpan={1} >부산 더존 병원</td>
                  <td colSpan={1}>대 표 자</td>
                  <td colSpan={2}>주 동 석  (인)</td>
                </tr>
                <tr><th colSpan={13} className="prescription-date">{(billCompleteData[0].PAYMENT_DATE+"").substring(0,4)}년  {(billCompleteData[0].PAYMENT_DATE+"").substring(5,7)}월 {(billCompleteData[0].PAYMENT_DATE+"").substring(8,10)}일</th></tr>
                <tr><th colSpan={13} className="prescription-reple align">
                  ※ 이 계산서,영수증은 소득세법상 의료비 공재산정에 사용할 수 있습니다.<br/><br/>
                  ※ 이 계산서,영수증에 대한 세부내역을 요구할 수 있습니다.<br/><br/>
                  ※ 전액본인부담이란 국민겅간보험법시행규칙 별표 5의 규정에 의한 요양급여비용의 <br/>   본인전액부담항목 비용을 말합니다.
                </th></tr>
                <tr><th colSpan={13} className="align-box align">  주 : 항목 중 선택항목은 요양기관의 특성에 따라 추가 또는 생략이 가능 합니다.</th></tr>
              </tbody>
            </table>
          </div>
        </div>
        <button className='print-btn' onClick={handlePrint}>영수증 출력</button>
      </div>
  )
}

export default BillPaper;
