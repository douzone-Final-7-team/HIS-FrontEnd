import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { executeModal } from '../../redux/outPatientInfoSlice.js';
// import { useSelector } from 'react-redux';
import './receptionModal.scss';

const ReceptionModal = () => {

const dispatch = useDispatch()
  
const ModalMode = (e)=>{
    dispatch(executeModal(false))
  }

  const selectPeople = useSelector(state=>{
    return state.outPatientInfo.value[0]
  }) 
  const getModalMode = useSelector(state=>{
    return state.outPatientInfo.value[8]
  })

  const getEmpName = useSelector(state=>{
    return state.outPatientInfo.value[9]
  })




  let modalTitle;
  let modalDate = new Date();
  modalDate = modalDate.getFullYear()+"-"+ (modalDate.getMonth()+1)+"-" + modalDate.getDate();
  let modalWriter = '작성자';
  let modalContentTitle = '간호 기록'
  let patientName;
  selectPeople &&(patientName = selectPeople.name);
  let modalBtn ='등록';
  let addContentTitle = '약 종류';
  let addInput=false
  let thirdTitle = '환자명'
  let literate=true
  let thirdPlaceholder;
  let faultSituation = true;
  let textareaContent = '';
  if(getModalMode === 'careInfo-modify'){
    modalTitle= 'Modify CareInfo';
    modalBtn = '수정';
    if(selectPeople == null){
        modalTitle= '오류 환자 미선택'
        faultSituation = false
        textareaContent = '환자가 선택되지 않았습니다.'
    }
  }else if(getModalMode === 'careInfo-create'){
    modalTitle= 'Create CareInfo';
    if(selectPeople == null){
        modalTitle= '오류 환자 미선택'
        faultSituation = false
        textareaContent = '환자가 선택되지 않았습니다.'
    }
  }else if(getModalMode === 'medi-check-modify'){
    modalTitle= 'Modify Medicine Record';
    modalBtn = '수정';
    modalContentTitle = '처방 기록'
    addInput = true;
    if(selectPeople == null){
        modalTitle= '오류 환자 미선택'
        faultSituation = false
        textareaContent = '환자가 선택되지 않았습니다.'
    }
  }else if(getModalMode === 'medi-check-create'){
    modalTitle= 'Create Medicine Record';
    modalContentTitle = '처방 기록'
    addInput = true;
    if(selectPeople == null){
        modalTitle= '오류 환자 미선택'
        faultSituation = false
        textareaContent = '환자가 선택되지 않았습니다.'
    }
  }
  else if(getModalMode === 'handover-modify'){
    modalTitle= 'Modify HandOver';
    modalBtn = '수정';
    thirdTitle = '인계자'
    thirdPlaceholder = '인계자'
    modalContentTitle = '인계 사항'
    literate =false
  }else if(getModalMode === 'handover-create'){
    modalTitle= 'Create HandOver';
    thirdTitle = '인계자'
    thirdPlaceholder = '인계자'
    modalContentTitle = '인계 사항'
    literate =false
  } else if(getModalMode === 'schedule-modify'){
    modalTitle= 'Modify Schedule';
    modalBtn = '수정';
    thirdTitle = '위치'
    thirdPlaceholder = '위치를 작성하세요'
    modalContentTitle = '일정 내용'
    literate =false
  }else if(getModalMode === 'schedule-create'){
    modalTitle= 'Create Schedule';
    modalContentTitle = '일정 내용'
    thirdTitle = '위치'
    thirdPlaceholder = '위치를 작성하세요'
    literate =false
  }

return(
<div className='wppaer' onClick={ModalMode}>
    <div className="container" onClick={(e) => e.stopPropagation()}>  
        <div id="contact">
            <h3>{modalTitle}</h3>
            <fieldset>
                <h5>날짜</h5>
                <input type="text" tabindex="1" readOnly value={modalDate}/>
            </fieldset>
            <fieldset>
                <h5>{modalWriter}</h5>
                <input type="text" tabindex="2" readOnly value={getEmpName}/>
            </fieldset>
            {literate ? <fieldset>
                <h5>{thirdTitle}</h5>
                <input type="text" tabindex="3" readOnly value={patientName}/>
            </fieldset> : 
            <fieldset>
                <h5>{thirdTitle}</h5>
                <input type="text" tabindex="3" placeholder={thirdPlaceholder}/>
            </fieldset>}
            {addInput && <fieldset>
                <h5>{addContentTitle}</h5>
                <input type="text" placeholder='약명을 작성하세요' tabindex="4"/>
            </fieldset>}
            <fieldset>
                <h5>{modalContentTitle}</h5>
                <textarea placeholder="내용을 작성하세요" tabindex="5" required>{textareaContent}</textarea>
            </fieldset>
            <fieldset>
            {faultSituation && <button name="submit" type="btn" id="contact-submit" data-submit="...Sending" onClick={ModalMode}>{modalBtn}</button>}
            </fieldset>
        </div>
    </div>
</div>
    )
}

export default ReceptionModal;