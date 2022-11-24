import { createSlice } from "@reduxjs/toolkit";
import {getInpatientInfo, getCareInfo, getMediRecords,getInpatientSchedules, getReceiveHandOver, getSendHandOver} from './AdmissionPatientInfoApi';


const outPatientInfoSlice = createSlice({
    name: 'outPatientInfoSlice',
    initialState: {value:[]},
    reducers:{
        selectPeople: (state, action) => {
           
                state.value[0] = action.payload;     
        },
        getSpecialityName: (state, action) => {
         
                state.value[5] = action.payload;     
    }
    },

    extraReducers: (builder) => {
        builder.addCase(getInpatientInfo.fulfilled, (state, action)=>{
                state.value[1] = action.payload 
            })

        builder.addCase(getCareInfo.fulfilled,(state, action)=>{
                state.value[2] = action.payload
            })
        builder.addCase(getMediRecords.fulfilled,(state, action)=>{
                state.value[3] = action.payload
            })
        builder.addCase(getInpatientSchedules.fulfilled,(state, action)=>{
              console.log(action.payload)
                state.value[4] = action.payload
            })
        builder.addCase(getReceiveHandOver.fulfilled,(state, action)=>{
              
                state.value[6] = action.payload
            })
        builder.addCase(getSendHandOver.fulfilled,(state, action)=>{
              
                state.value[6] = action.payload
            })                     
    }

});




export default outPatientInfoSlice;
export const {selectPeople, getSpecialityName} = outPatientInfoSlice.actions;