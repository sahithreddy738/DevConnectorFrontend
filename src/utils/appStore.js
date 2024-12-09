import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import feedReducer from "./slices/feedSlice";
import connectionReducer from "./slices/connectionsSlice";
import requestReducer from "./slices/requestsSlice";
import profileReducer from "./slices/profileSlice";
import chatReducer from "./slices/chatSlice";
import messageReducer from "./slices/messageSlice";
import notificationReducer from "./slices/notificationsSlice";

const appStore=configureStore({
    reducer:{
      user:userReducer,
      feed:feedReducer,
      connections:connectionReducer,
      requests:requestReducer,
      profile:profileReducer,
      chat:chatReducer,
      message:messageReducer,
      notification:notificationReducer
    }
})

export default appStore;