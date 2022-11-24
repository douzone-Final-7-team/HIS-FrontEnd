import React from 'react'
import { useSelector } from 'react-redux';
// style
import './takeMediCheck.scss';

const TakeMediCheck = () => {
  
    const getMediRecords = useSelector(state=>{
      return state.outPatientInfo.value[3]
    })

  

  return (
    <div className='medi-check-container'>
      <div className='medi-check-wapper'>
        <table>
          <thead>
            <tr>
              <th>-</th>
              <th>날짜</th>
              <th>복용 확인</th>
              <th>처방 내용</th>
              <th>약 종류</th>
              <th>수행자</th>
            </tr>
          </thead>
          <tbody>
            {getMediRecords != null ?
              getMediRecords.map((mediRecords, index)=>(
                <tr key = {index}>
                  <td className='medi-fix' ><input type= "radio" name ="medi" /></td>
                  <td className='medi-date' >{(mediRecords.ORDER_DATE + "").substring(0,10)}</td>
                  <td className='medi-check' ><input type= "checkbox" /></td>
                  <td className='medi-content' >{mediRecords.ORDER_CONTENT}</td>
                  <td className='medi-oderer' >{mediRecords.MEDICINE_NAME}</td>
                  <td className='medi-oderer' >{mediRecords.ORDERER}</td>
                </tr>
                ))
              :  
                <tr>
                <td className='medi-fix'><input type= "radio" name ="medi"/></td>
                <td className='medi-date'></td>
                <td className='medi-check'><input type= "checkbox"/></td>
                <td className='medi-content'>빈 데이터 입니다 환자를 클릭 해 주세요</td>
                <td className='medi-oderer'></td>
                <td className='medi-oderer'></td>
              </tr>
              }     
          </tbody>
        </table>
      </div>
      <div className='btn-wapper' >
        <a href='#!' className='btn'>수정</a> 
        <a href='#!' className='btn'>등록</a>
      </div>
    </div>
  )
}

export default TakeMediCheck ;
