import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from "./components/Login";
import Profile from "./components/Profile";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Feed from "./components/Feed";
import Connections from "./components/Connections";
import Requests from "./components/Requests";
import SignUp from "./components/SignUp";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ViewProfile from "./components/ViewProfile";
import Body from "./pages/Body";
import ChatPage from "./pages/ChatPage";
import ChatHome from "./components/NoChat";
import SingleChat from "./components/SingleChat";

function App() {
  return (
    <div>
      <Provider store={appStore}>
        <BrowserRouter basename="/">
          <ToastContainer />
          <Routes>
            <Route path="/" element={<Body />}>
              <Route path="/" element={<Feed />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/connections" element={<Connections />} />
              <Route path="/requests" element={<Requests />} />
              <Route path="/profile/:userId" element={<ViewProfile />} />
              <Route path="/chats" element={<ChatPage />}>
                <Route index element={<ChatHome />} />
                <Route path=":chatId" element={<SingleChat />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
