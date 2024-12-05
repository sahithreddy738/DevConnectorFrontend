import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import feedReducer from "./slices/feedSlice";
import connectionReducer from "./slices/connectionsSlice";
import requestReducer from "./slices/requestsSlice";
import profileReducer from "./slices/profileSlice";
import chatReducer from "./slices/chatSlice";
import messageReducer from "./slices/messageSlice";

const appStore=configureStore({
    reducer:{
      user:userReducer,
      feed:feedReducer,
      connections:connectionReducer,
      requests:requestReducer,
      profile:profileReducer,
      chat:chatReducer,
      message:messageReducer
    }
})

export default appStore;