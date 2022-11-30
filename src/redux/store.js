import { configureStore } from '@reduxjs/toolkit';
import searchSlice from './Slice';
import outPatientInfoSlice from './outPatientInfoSlice';
import outChangeDateSlice from './outChangeDateSlice';
import disChargeSlice from './disChargeSlice';
// store : 모든 slice를 통합
const store = configureStore({
  reducer: {
    search: searchSlice.reducer,
    outPatientInfo:outPatientInfoSlice.reducer,
    outChangeDate:outChangeDateSlice.reducer,
    disCharge:disChargeSlice.reducer
    // searchSlice 내부의 모든 reducer를 통합하여 store에 하나의 reducer로 저장
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
  
});


export default store;