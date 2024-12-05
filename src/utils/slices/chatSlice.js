import { createSlice } from "@reduxjs/toolkit";


const chatSlice=createSlice({
    name:"chat",
    initialState:{
        chats:[],
        selectedChat:{}
    },
    reducers:{
       addChats:(state,action) => {
        state.chats=action.payload
       },
       setSelectedChat:(state,action) => {
        state.selectedChat=action.payload
       }
    }
})

export const {addChats,setSelectedChat}=chatSlice.actions

export default chatSlice.reducer;