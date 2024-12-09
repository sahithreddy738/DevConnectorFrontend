import { createSlice } from "@reduxjs/toolkit";


const notificationSlice=createSlice({
    name:"notification",
    initialState:[],
    reducers:{
        addNotifications:(state,action) => {
            return [...state,...action.payload]
        },
        removeNotification:(state,action) => {
            const filteredNotifications=state.filter((notification)=>notification.sender._id!==action.payload);
            return filteredNotifications;
        }
    }
})

export const {addNotifications,removeNotification} =notificationSlice.actions;
export default notificationSlice.reducer;