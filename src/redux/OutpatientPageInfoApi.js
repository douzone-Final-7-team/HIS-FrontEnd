import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// 진료메모 / 치료오더 SELECT
export const getTreatmentInfo = createAsyncThunk(
  'OutpatientPageInfoSlice/getTreatmentInfo',
  async (info) => {
    const resp = await axios.post("http://localhost:9090/outpatient/treatmentInfos",
    info,
    {
      headers: {
        "Content-Type" : `application/json`,
      },
    });
    return resp.data
  }
)