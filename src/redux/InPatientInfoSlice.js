import { createSlice } from "@reduxjs/toolkit";
import {getInpatientInfo, getCareInfo, getMediRecords,getInpatientSchedules
        , getReceiveHandOver, getSendHandOver, setCareInfo,
        setMediRecord, setInpatientSchedule, setHandOver, changeCareInfo, changeMediRecord,
        changeHandover,changeSchedule, changeTakeMediStatus, changeDischargeDueDate,changeScheduleStatus} from './AdmissionPatientInfoApi';


const InPatientInfoSlice = createSlice({
    name: 'inPatientInfoSlice',
    initialState: {value:[null,null,null,null,null,{
        PATIENT_NAME: "",
        GENDER : "",
        PATIENT_TEL : "",
        PROTECTOR_NAME : "",
        PROTECTOR_TEL : "",
        PATIENT_ADDR : "",
        EMP_NAME : "",
        SPECIALITY_NAME : "",
        DIAGNOSIS : "",
        DISCHARGE_DUEDATE : "",
        ADMISSION_ID_PK : "",
        PATIENT_AGE : ""

    },[{
        CARE_DATE : "",
        CARE_CONTENT : "빈 데이터 입니다 환자를 클릭 하세요",
        NURSE_NAME : "",
    }],[{
        RECORD_ID_PK: "",
        ORDER_CONTENT:"빈 데이터 입니다 환자를 클릭 해 주세요",
        MEDICINE_NAME: "",
        ORDERER : "",
        TAKE_MEDICINE_STATUS : false,
        ORDER_DATE: "",
    }],[{
        SCHEDULE_ID_PK : "",
        SCHEDULE_CONTENT : "",
        SCHEDULE_PLACE : "",
        SCHEDULE_DATE : "",
        PS_CODE_NAME : "",
        PATIENT_NAME : ""
    }],[{
        HANDOVER_ID_PK : "",
        HANDOVER_CONTENT : "",
        HANDOVER_TARGET : "",
        EMP_NAME : "",
        HANDOVER_DATE : ""  
    }],
    [true]]},
    reducers:{
        selectPeople: (state, action) => {
            state.value[0] = action.payload;     
        },
        executeModal: (state, action) => {
         
            state.value[1] = action.payload;     
        },
        modalMode: (state, action) => {
         
            state.value[2] = action.payload;     
        },
        modifyElement: (state, action) => {
            state.value[3] = action.payload;     
        },
        globalmodifyElement: (state, action) => {
            state.value[4] = action.payload;     
        },
        setRadioChecked: (state, action) => {
            state.value[10] = action.payload;     
        }
    },

    extraReducers: (builder) => {
        builder.addCase(getInpatientInfo.fulfilled, (state, action)=>{
                state.value[5] = action.payload 
            })
        builder.addCase(changeDischargeDueDate.fulfilled,(state, action)=>{
              
                state.value[5] = action.payload
            })     
        builder.addCase(getCareInfo.fulfilled,(state, action)=>{
                state.value[6] = action.payload
            })
        builder.addCase(setCareInfo.fulfilled,(state, action)=>{
              
                state.value[6] = action.payload
            })
        builder.addCase(changeCareInfo.fulfilled,(state, action)=>{
              
                state.value[6] = action.payload
            })
        builder.addCase(getMediRecords.fulfilled,(state, action)=>{
                state.value[7] = action.payload
            })
        builder.addCase(setMediRecord.fulfilled,(state, action)=>{
                state.value[7] = action.payload
            })
        builder.addCase(changeMediRecord.fulfilled,(state, action)=>{
                state.value[7] = action.payload
            })
        builder.addCase(changeTakeMediStatus.fulfilled,(state, action)=>{
                state.value[7] = action.payload
            })
        builder.addCase(getInpatientSchedules.fulfilled,(state, action)=>{
                state.value[8] = action.payload
            })
        builder.addCase(setInpatientSchedule.fulfilled,(state, action)=>{
                state.value[8] = action.payload
            })
        builder.addCase(changeSchedule.fulfilled,(state, action)=>{
                state.value[8] = action.payload
            })
        builder.addCase(changeScheduleStatus.fulfilled,(state, action)=>{
                state.value[8] = action.payload
            })
        builder.addCase(getReceiveHandOver.fulfilled,(state, action)=>{
              
                state.value[9] = action.payload
            })
        builder.addCase(getSendHandOver.fulfilled,(state, action)=>{
              
                state.value[9] = action.payload
            })
        builder.addCase(setHandOver.fulfilled,(state, action)=>{
              
                state.value[9] = action.payload
            })
        builder.addCase(changeHandover.fulfilled,(state, action)=>{
              
                state.value[9] = action.payload
            })              
    }

});

export default InPatientInfoSlice;
export const {selectPeople, executeModal, modalMode,modifyElement,globalmodifyElement,setRadioChecked} = InPatientInfoSlice.actions;

