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
            navigate("/");
        }catch(err) {
            if(err.status===401) navigate("/login");
            console.log(err.message);
        }
    }
    useEffect(()=>{
       fetchUser()
    },[]);
    return (
        <div className="w-screen h-screen scrollbar" data-theme="dark">
           <NavBar />
           <Outlet />
           <Footer />
        </div>
    )
}

export default Body;