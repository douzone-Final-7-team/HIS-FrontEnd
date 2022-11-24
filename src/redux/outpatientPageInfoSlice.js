import { createSlice } from '@reduxjs/toolkit';
import { getTreatmentInfo } from './OutpatientPageInfoApi';

const initialState = {
  username: '',
  status: ''
}

const outpatientPageInfoSlice = createSlice({
  name: 'outpatientPageInfoSlice',
  initialState,
  reducers: {
    test: (state, action) => {
      state.value = state.payload;
    }
  },
  extraReducers: (builder) => {   // 비동기적인 action
    builder.addCase(getTreatmentInfo.pending, (state, action) => {
      state.status = 'Loading';
    })
    builder.addCase(getTreatmentInfo.fulfilled, (state, action) => {
      state.value = action.payload;
      state.status = 'complete';
    })
    builder.addCase(getTreatmentInfo.rejected, (state, action) => {
      state.status = 'fail';
    })
  }
})

export default outpatientPageInfoSlice;
// 비구조화 할당으로 정의하여 수출
export const { test } = outpatientPageInfoSlice.actions;