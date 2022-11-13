import { configureStore, createAsyncThunk } from '@reduxjs/toolkit';
import searchSlice from './Slice';

const asyncUpFetch = createAsyncThunk(
  'searchSlice/asyncUpFetch',    //type
  async () => {
    const resp = await fetch('')     //요청 : 서버접속
    const data = await resp.json();     // 결과를 가져오고
    return data.value;
  }
)

// store : 모든 slice를 통합
const store = configureStore({
  reducer: {
    search: searchSlice.reducer
    // searchSlice 내부의 모든 reducer를 통합하여 store에 하나의 reducer로 저장
  }
});


export default store;