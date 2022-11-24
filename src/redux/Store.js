import { configureStore } from "@reduxjs/toolkit";
import outPatientInfoSlice from './outPatientInfoSlice';
const store = configureStore({
        reducer: {
            outPatientInfo:outPatientInfoSlice.reducer,
        }
    }
);

export default store;