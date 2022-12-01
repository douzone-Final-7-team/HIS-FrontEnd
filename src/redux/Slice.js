import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// API 호출
// import PatientApi from '../api/PatientApi';

// createAsyncThunk
const asyncUpFetch = createAsyncThunk(
  // 'Slice/asyncUpFetch',   //type
  // async (userId) => {
  //   const resp = await PatientApi.fetchById(userId)     //요청 : 서버접속
  //   const data = await resp.json(); 
  //   return data.value;    
  // }
)

// initialState
const initialState = {
  username: '',
  status: ''
}

// createSlice
const searchSlice = createSlice({
  name: 'searchSlice',
  initialState,
  reducers: {
    find: (state, action) => {
      state.value = state.payload;
    }
  },
  extraReducers: (builder) => {   // 비동기적인 action
    builder.addCase(asyncUpFetch.pending, (state, action) => {
      state.status = 'Loading';
    })
    builder.addCase(asyncUpFetch.fulfilled, (state, action) => {
      state.value = action.payload;
      state.status = 'complete';
    })
    builder.addCase(asyncUpFetch.rejected, (state, action) => {
      state.status = 'fail';
    })
  }
});



export default searchSlice;
// 비구조화 할당으로 정의하여 수출
export const { find } = searchSlice.actions;