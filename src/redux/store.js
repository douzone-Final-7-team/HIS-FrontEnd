import { configureStore } from '@reduxjs/toolkit';
import outPatientInfoSlice from './outPatientInfoSlice';
import outChangeDateSlice from './outChangeDateSlice';
import outpatientPageInfoSlice from './outpatientPageInfoSlice';

// store : 모든 slice를 통합
const store = configureStore({
  reducer: {
    changePatientCode: outpatientPageInfoSlice.reducer,
    readPatientRegistrationInfo: outpatientPageInfoSlice.reducer,
    readOutpatientInfo: outpatientPageInfoSlice.reducer,
    outPatientInfo:outPatientInfoSlice.reducer,
    outChangeDate:outChangeDateSlice.reducer
    // 모든 reducer를 통합하여 store에 하나의 reducer로 저장
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
  
});


export default store;