import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// 입원 환자 정보 Read
export const getInpatientInfo = createAsyncThunk(
    'outPatientInfoSlice/getInpatientInfo',
    async(selectedOutInfo) => {
        const resp = await axios.post("http://localhost:9090/patient/outInfo",
        selectedOutInfo,
        {
          headers: {
            "Content-Type" : `application/json`,
          },
        });
        return resp.data
    }
)


// 특정 환자 간호기록 Read
export const getCareInfo = createAsyncThunk(
  'outPatientInfoSlice/getCareInfo',
  async(elements) => {
      const resp = await axios.post("http://localhost:9090/admission/careInfos",
      elements,
      {
        headers: {
          "Content-Type" : `application/json`,
        },
      });
      
      return resp.data
  }
)


// 특정 환자 간호기록 create
export const setCareInfo = createAsyncThunk(
  'outPatientInfoSlice/setCareInfo ',
  async(elements) => {
      const resp = await axios.post("http://localhost:9090/admission/createdCareInfo",
      elements,
      {
        headers: {
          "Content-Type" : `application/json`,
        },
      });
      
      return resp.data
  }
)

// 특정 환자 간호기록 UPDATE
export const changeCareInfo = createAsyncThunk(
  'outPatientInfoSlice/changedCareInfo ',
  async(elements) => {
      const resp = await axios.put("http://localhost:9090/admission/changedCareInfo",
      elements,
      {
        headers: {
          "Content-Type" : `application/json`,
        },
      });
      
      return resp.data
  }
)



// 특정 환자 처방 기록 Read
export const getMediRecords = createAsyncThunk(
  'outPatientInfoSlice/getMediRecords',
  async(elements) => {
      const resp = await axios.post("http://localhost:9090/admission/mediRecords",
      elements,
      {
        headers: {
          "Content-Type" : `application/json`,
        },
      });
      
      return resp.data
  }
)



// 특정 환자 처방 기록 Create
export const setMediRecord = createAsyncThunk(
  'outPatientInfoSlice/setMediRecord',
  async(elements) => {
      const resp = await axios.post("http://localhost:9090/admission/createdMediRecord",
      elements,
      {
        headers: {
          "Content-Type" : `application/json`,
        },
      });
      
      return resp.data
  }
)

// 특정 환자 처방 기록 Update
export const changeMediRecord = createAsyncThunk(
  'outPatientInfoSlice/changedMediRecord',
  async(elements) => {
      const resp = await axios.put("http://localhost:9090/admission/changedMediRecord",
      elements,
      {
        headers: {
          "Content-Type" : `application/json`,
        },
      });
      
      return resp.data
  }
)

// 특정 환자 처방 기록 복약 여부 Update
export const changeTakeMediStatus = createAsyncThunk(
  'outPatientInfoSlice/changeTakeMediStatus',
  async(elements) => {
      const resp = await axios.put("http://localhost:9090/admission/changedMediRecord/status",
      elements,
      {
        headers: {
          "Content-Type" : `application/json`,
        },
      });
      return resp.data
  }
)



//병동 전체 오늘 일정 Read
export const getInpatientSchedules = createAsyncThunk(
  'outPatientInfoSlice/getInpatientSchedules',
  async(specialityElements) => {
      const resp = await axios.post("http://localhost:9090/admission/schedules",
      specialityElements,
      {
        headers: {
          "Content-Type" : `application/json`,
        },
      });
      console.log(specialityElements)
      console.log(resp.data)
      return resp.data
  }
)

//병동 전체 일정 create
export const setInpatientSchedule = createAsyncThunk(
  'outPatientInfoSlice/setInpatientSchedule',
  async(specialityElements) => {
      const resp = await axios.post("http://localhost:9090/admission/createdSchedule",
      specialityElements,
      {
        headers: {
          "Content-Type" : `application/json`,
        },
      });
      return resp.data
  }
)


//병동 전체 일정 update
export const changeScheduleStatus = createAsyncThunk(
  'outPatientInfoSlice/changeScheduleStatus',
  async(specialityElements) => {
      const resp = await axios.put("http://localhost:9090/admission/changedSchedule",
      specialityElements,
      {
        headers: {
          "Content-Type" : `application/json`,
        },
      });
      return resp.data
  }
)




//나에게 전달 된 인계사항 READ
export const getReceiveHandOver = createAsyncThunk(
  'outPatientInfoSlice/getReceiveHandOver',
  async(specialityElements) => {
      const resp = await axios.post("http://localhost:9090/admission/toMyHandOvers",
      specialityElements,
      {
        headers: {
          "Content-Type" : `application/json`,
        },
      });
    
      return resp.data
  }
)

//내가 작성한 인계사항 READ
export const getSendHandOver = createAsyncThunk(
  'outPatientInfoSlice/getSendHandOver',
  async(specialityElements) => {
      const resp = await axios.post("http://localhost:9090/admission/fromMyHandOvers",
      specialityElements,
      {
        headers: {
          "Content-Type" : `application/json`,
        },
      });
    
      return resp.data
  }
)

//인계사항 Create
export const setHandOver = createAsyncThunk(
  'outPatientInfoSlice/setHandOver',
  async(specialityElements) => {
      const resp = await axios.post("http://localhost:9090/admission/handOver",
      specialityElements,
      {
        headers: {
          "Content-Type" : `application/json`,
        },
      });
      return resp.data
     
  }
)


// 내가 작성한 인계사항 Update
export const changeHandover = createAsyncThunk(
  'outPatientInfoSlice/changeHandover',
  async(elements) => {
      const resp = await axios.put("http://localhost:9090/admission/myHandOver",
      elements,
      {
        headers: {
          "Content-Type" : `application/json`,
        },
      });
      
      return resp.data
  }
)


