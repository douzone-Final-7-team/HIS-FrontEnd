
// style
import './careInfo.scss';
import { useSelector } from 'react-redux';


const CareInfo = ({setExcuteModal, excuteModal}) => {
  
  
  const getCareInfo = useSelector(state=>{
    return state.outPatientInfo.value[2]
  })

  return (
    <div className='care-info-container'>
      <div className='care-info-wapper'>
        <table>
          <thead>
            <tr>
              <th>-</th>
              <th>날짜</th>
              <th>간호기록</th>
              <th>작성자</th>
            </tr>
          </thead>
          <tbody>
          {getCareInfo != null ?
          getCareInfo.map((careInfo, index)=>(
            <tr key = {index}>
              <td className='careInfo-fix'><input type= "radio" name= "careInfo"/></td>
              <td className='careInfo-date'>{(careInfo.CARE_DATE + "").substring(0,10)}</td>
              <td className='careInfo-content'>{careInfo.CARE_CONTENT}</td>
              <td className='careInfo-writer'>{careInfo.NURSE_NAME}</td>
            </tr>
            ))
          :  
            <tr>
              <td className='careInfo-fix'><input type= "radio" name= "careInfo"/></td>
              <td className='careInfo-date'></td>
              <td className='careInfo-content'>빈 데이터 입니다 환자를 클릭 하세요</td>
              <td className='careInfo-writer'></td>
            </tr>
          }           
          </tbody>
        </table>
      </div>
      <div className='btn-wapper' >
        <a href='#!' className='btn' onClick={()=>{setExcuteModal(!excuteModal)}}>수정</a> 
        <a href='#!' className='btn'>등록</a>
      </div>
    </div>
  )
}

export default CareInfo ;
