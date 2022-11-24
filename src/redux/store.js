import { configureStore } from '@reduxjs/toolkit';
import searchSlice from './Slice';
import outPatientInfoSlice from './outPatientInfoSlice';
// store : 모든 slice를 통합
const store = configureStore({
  reducer: {
    search: searchSlice.reducer,
    outPatientInfo:outPatientInfoSlice.reducer,
    // searchSlice 내부의 모든 reducer를 통합하여 store에 하나의 reducer로 저장
  }
});


export default store;