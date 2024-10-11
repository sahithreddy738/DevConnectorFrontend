import { Outlet, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import NavBar from "./NavBar";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { GET_PROFILE_URL } from "../utils/constants";
import { addUser } from "../utils/slices/userSlice";


const Body=() => {
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const fetchUser=async() =>{
        try{
            const res=await axios.get(GET_PROFILE_URL,{withCredentials:true});
            dispatch(addUser(res.data));
        }catch(err) {
           navigate("/login");
        }
    }
    useEffect(()=>{
       fetchUser()
    },[]);
    return (
        <div className="min-h-screen flex flex-col bg-zinc-300">
        <NavBar />
        <div className="flex-grow">
            <Outlet />
        </div>
        <Footer />
    </div>
    )
}

export default Body;