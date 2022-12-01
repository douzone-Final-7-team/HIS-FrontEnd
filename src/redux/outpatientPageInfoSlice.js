import { createSlice } from '@reduxjs/toolkit';
import { getTreatmentInfo, getPatientRegistrationInfo, changeOutpatientStatus } from './OutpatientPageInfoApi';

const outpatientPageInfoSlice = createSlice({
  name: 'outpatientPageInfoSlice',
  initialState: {value: [{}]},
  reducers: {
    readOutpatientInfo: (state, action) => {
      state.value[0] = action.payload;
    },
    readPatientRegistrationInfo: (state, action) => {
      state.value[1] = action.payload;
    },
  },
  extraReducers: (builder) => {   // 비동기적인 action
    // 진료메모 / 치료오더 SELECT
    builder.addCase(getTreatmentInfo.pending, (state, action) => {
      state.status = 'Loading';
    })
    builder.addCase(getTreatmentInfo.fulfilled, (state, action) => {    //성공했을 경우
      state.value[0] = action.payload;
      state.status = 'complete';
    })
    builder.addCase(getTreatmentInfo.rejected, (state, action) => {
      state.status = 'fail';
    })
    // 환자 과거병력 조회 SELECT
    builder.addCase(getPatientRegistrationInfo.pending, (state, action) => {
      state.status = 'Loading';
    })
    builder.addCase(getPatientRegistrationInfo.fulfilled, (state, action) => {    //성공했을 경우
      state.value[1] = action.payload;
      state.status = 'complete';
    })
    builder.addCase(getPatientRegistrationInfo.rejected, (state, action) => {
      state.status = 'fail';
    })
    // 외래진료환자 상태코드 UPDATE
    builder.addCase(changeOutpatientStatus.pending, (state, action) => {
      state.status = 'Loading';
    })
    builder.addCase(changeOutpatientStatus.fulfilled, (state, action) => {    //성공했을 경우
      state.value[2] = action.payload;
      state.status = 'complete';
    })
    builder.addCase(changeOutpatientStatus.rejected, (state, action) => {
      state.status = 'fail';
    })
  }
})




export default outpatientPageInfoSlice;
// 비구조화 할당으로 정의하여 수출
export const { readOutpatientInfo, readPatientRegistrationInfo } = outpatientPageInfoSlice.actions;