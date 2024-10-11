import { createSlice } from "@reduxjs/toolkit";


const profileSlice=createSlice({
    name:'profile',
    initialState:null,
    reducers:{
        getProfileById:(state,action)=>{
           return action.payload;
        }
    }
})


export const {getProfileById}=profileSlice.actions;
export default profileSlice.reducer;