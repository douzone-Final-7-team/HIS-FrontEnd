import { createSlice } from "@reduxjs/toolkit";
import {getInpatientInfo, getCareInfo, getMediRecords,getInpatientSchedules
        , getReceiveHandOver, getSendHandOver, setCareInfo,
        setMediRecord, setInpatientSchedule, setHandOver, changeCareInfo, changeMediRecord,
        changeHandover,changeScheduleStatus, changeTakeMediStatus} from './AdmissionPatientInfoApi';


const outPatientInfoSlice = createSlice({
    name: 'outPatientInfoSlice',
    initialState: {value:[]},
    reducers:{
        selectPeople: (state, action) => {
            state.value[0] = action.payload;     
        },
        getSpecialityName: (state, action) => {
         
            state.value[5] = action.payload;     
        },
        executeModal: (state, action) => {
         
            state.value[7] = action.payload;     
        },
        modalMode: (state, action) => {
         
            state.value[8] = action.payload;     
        },
        getEmpName: (state, action) => {
         
            state.value[9] = action.payload;     
        },
        modifyElement: (state, action) => {
            state.value[10] = action.payload;     
        },
        globalmodifyElement: (state, action) => {
            state.value[11] = action.payload;     
        }  
    },

    extraReducers: (builder) => {
        builder.addCase(getInpatientInfo.fulfilled, (state, action)=>{
                state.value[1] = action.payload 
            })

        builder.addCase(getCareInfo.fulfilled,(state, action)=>{
                state.value[2] = action.payload
            })
        builder.addCase(setCareInfo.fulfilled,(state, action)=>{
              
                state.value[2] = action.payload
            })
        builder.addCase(changeCareInfo.fulfilled,(state, action)=>{
              
                state.value[2] = action.payload
            })
        builder.addCase(getMediRecords.fulfilled,(state, action)=>{
                state.value[3] = action.payload
            })
        builder.addCase(setMediRecord.fulfilled,(state, action)=>{
                state.value[3] = action.payload
            })
        builder.addCase(changeMediRecord.fulfilled,(state, action)=>{
                state.value[3] = action.payload
            })
        builder.addCase(changeTakeMediStatus.fulfilled,(state, action)=>{
                state.value[3] = action.payload
                })
        builder.addCase(getInpatientSchedules.fulfilled,(state, action)=>{
                state.value[4] = action.payload
            })
        builder.addCase(setInpatientSchedule.fulfilled,(state, action)=>{
                state.value[4] = action.payload
            })
        builder.addCase(changeScheduleStatus.fulfilled,(state, action)=>{
                state.value[4] = action.payload
            })     
        builder.addCase(getReceiveHandOver.fulfilled,(state, action)=>{
              
                state.value[6] = action.payload
            })
        builder.addCase(getSendHandOver.fulfilled,(state, action)=>{
              
                state.value[6] = action.payload
            })
        builder.addCase(setHandOver.fulfilled,(state, action)=>{
              
                state.value[6] = action.payload
            })
        builder.addCase(changeHandover.fulfilled,(state, action)=>{
              
                state.value[6] = action.payload
            })
       
                            
    }

});




export default outPatientInfoSlice;
export const {selectPeople, getSpecialityName, executeModal, modalMode, 
    getEmpName, modifyElement,globalmodifyElement} = outPatientInfoSlice.actions;

