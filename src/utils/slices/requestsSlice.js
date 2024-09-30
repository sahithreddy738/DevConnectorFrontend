import { createSlice } from "@reduxjs/toolkit";

const requestsSlice=createSlice({
    name:"requests",
    initialState:[],
    reducers:{
        addRequests:(state,action) => {
            return action.payload
        },
        removeRequest:(state,action) =>{
            const newRequests=state.filter((req)=>req._id!=action.payload);
            return newRequests;
        }
    }
})

export const {addRequests,removeRequest}=requestsSlice.actions;
export default requestsSlice.reducer;