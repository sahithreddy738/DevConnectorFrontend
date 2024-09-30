import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import feedReducer from "./slices/feedSlice";
import connectionReducer from "./slices/connectionsSlice";
import requestReducer from "./slices/requestsSlice";


const appStore=configureStore({
    reducer:{
      user:userReducer,
      feed:feedReducer,
      connections:connectionReducer,
      requests:requestReducer
    }
})

export default appStore;