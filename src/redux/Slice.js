import { createSlice } from '@reduxjs/toolkit';
// API 호출
import PatientApi from '../api/PatientApi';

// createSlice
const searchSlice = createSlice({
  name: 'searchSlice',
  initialState: {
    username: '',
    age: ''
  },
  reducers: {
    find: (state, action) => {
      // console.log(action)
      state.value = state.payload;
    }
  }
});

// const apiSlice = createSlice({
//   name: 'api' ,
//   patitentInfo: {
//     loading: false,
//     data: {
//         username: '',
//     }
//   }
//   reducers: {

//   }
// });


export default searchSlice;
// 비구조화 할당으로 정의하여 수출
export const { find } = searchSlice.actions;