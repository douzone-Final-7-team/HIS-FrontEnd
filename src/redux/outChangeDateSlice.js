import { createSlice } from "@reduxjs/toolkit";



const outChangeDateSlice = createSlice({
    name: 'outChangeDateSlice',
    initialState: {value: new Date()},
    reducers:{
        setStartDate: (state, action) => {
            state.value = action.payload;     
        }
    }
});




export default outChangeDateSlice;
export const {setStartDate} = outChangeDateSlice.actions;

