import React from "react";
// style
import '../../styles/scss/reset.scss';
import '../../components/modal/PatientDetail.scss';
// components 

const PatientDetailModal = () => {

    return(
        <div className="detail-box">
            <main>
              <div>
                  <p>과거 병력</p>
                  <hr />
                  <br /><br />
                  <div>
                    <p className="patient-title">환자 정보</p>
                    <table>
                        <tr>
                            <th>이름</th>
                            <td><input value="배병서" /></td>
                            <th colSpan={2}>주민등록번호</th>
                            <td colSpan={2}><input value="970721-1865467" /></td>
                            <th>보험유무</th>
                            <td><input value="O"/></td>
                        </tr>
                        <tr>
                            <th>S/A</th>
                            <td><input value="M/26"/></td>
                            <th>TEL</th>
                            <td><input value="010-2227-1396"/></td>
                            <th>진료과</th>
                            <td><input value="해당 진료과"/></td>
                            <th>진료구분</th>
                            <td><input value="재진"/></td>
                        </tr>
                        <tr>
                            <th colSpan={2}>주소</th>
                            <td colSpan={10}><input className="addr" value="부산시 금정구 금정로 20 107동 2904호" /></td>
                        </tr>
                        <tr>
                            <th colSpan={2}>증상</th>
                            <td colSpan={10}><input className="symptom" value="존나 아프다" /></td>
                        </tr>
                    </table>
                  </div>

                  <div className="record-box">
                    <p className="record-title">진료 기록</p>
                    <table>
                        <tr>
                            <th>진료 의사</th>
                            <td><input value="황동화 교수" /></td>
                            <th>병 명</th>
                            <td><input value="위염" /></td>
                            <th>치료</th>
                            <td><input value="O" /></td>
                            <th>입원</th>
                            <td><input value="O" /></td>
                            <th>약 처방</th>
                            <td><input value="O" /></td>
                        </tr>
                        <tr>
                            <th>치료오더</th>
                            <td colSpan={10}><input value="치료 오더 내역입니다." /></td>
                        </tr>
                        <tr>
                            <th>입원 오더</th>
                            <td colSpan={10}><input value="입원 오더 내용입니다." /></td>
                        </tr>
                        <tr>
                            <th>약 처방</th>
                            <td colSpan={10}><input value="약 처방 내역입니다." /></td>
                        </tr>
                        <tr className="memo-tr">
                            <th>진료 메모</th>
                            <td colSpan={10}><input value="진료 메모입니다." /></td>
                        </tr>
                    </table>
                  </div>
              </div>
            </main>
        </div>
    )
}

export default PatientDetailModal;