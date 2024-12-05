import { createSlice } from "@reduxjs/toolkit";

const messageSlice=createSlice({
    name:"message",
    initialState:[],
    reducers:{
        addMessages:(state,action)=>{
            const existingIds = new Set(state.map((message) => message._id));
            const newMessages = action.payload.filter(
              (newMessage) => !existingIds.has(newMessage._id)
            );
            state.push(...newMessages);
        },
        removeMessages:()=>{
           return [];
        }
    }
})

export const {addMessages,removeMessages}=messageSlice.actions;
export default messageSlice.reducer;