import { Outlet, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { CONNECTIONS_URL, GET_PROFILE_URL } from "../utils/constants";
import { addUser } from "../utils/slices/userSlice";
import { addConnections } from "../utils/slices/connectionsSlice";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fetchUser = async () => {
    try {
      const res = await axios.get(GET_PROFILE_URL, { withCredentials: true });
      dispatch(addUser(res.data));
    } catch (err) {
      navigate("/login");
    }
  };
  const getConnections = async () => {
    try {
      const res = await axios.get(CONNECTIONS_URL, { withCredentials: true });
      dispatch(addConnections(res?.data?.userConnections));
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getConnections();
  }, []);
  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <div className="min-h-screen flex flex-col bg-zinc-300 hide-scrollbar min-w-screen">
      <NavBar />
      <div className="flex-grow">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Body;
