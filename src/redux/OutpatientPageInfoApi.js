import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL } from '../utils/constants/Config';

// 진료메모 / 치료오더 SELECT
export const getTreatmentInfo = createAsyncThunk(
  'OutpatientPageInfoSlice/getTreatmentInfo',
  async (receiveId) => {
    const resp = await axios.post( API_URL + "/outpatient/treatmentInfos",
    {receiveId: receiveId},
    {
      headers: {
        "Content-Type" : `application/json`,
      },
    });
    // console.log(receiveId)
    return resp.data
  }
);



// 환자 과거병력 조회 SELECT
export const getPatientRegistrationInfo = createAsyncThunk(
  'OutpatientPageInfoSlice/getPatientRegistrationInfo',
  async (info) => {
    const resp = await axios.post( API_URL + "/patient/regInfo",
    {
      PATIENT_NAME: info.patName,
      PATIENT_SSN : info.PATIENT_SSN
    },
    {
      headers: {
        "Content-Type" : `application/json`,
      },
    });
    return resp.data
  }
);



// 외래진료 상태코드 UPDATE
export const changeOutpatientStatus = createAsyncThunk(
  'OutpatientPageInfoSlice/changeOutpatientStatus',
  async (receiveId) => {
    const resp = await axios.put(API_URL + "/outpatient/changeOutpatientStatus",
    {receiveId: receiveId},
    {
      headers: {
        "Content-Type" : `application/json`,
      },
    });
 
    return resp.data
  }
);
