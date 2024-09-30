import { useState } from "react";
import Input from "./Input";
import axios from "axios";
import { LOGIN_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/slices/userSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState(" ");
  const [password, setPassword] = useState(" ");
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const handleSubmit=async () => {
     try{
        const res=await axios.post(LOGIN_URL,{email:email.trim(),password:password.trim()},{withCredentials:true});
        dispatch(addUser(res.data));
        navigate("/");
     } catch(err) {
       console.log(err);
     }
  }
  return (
    <div className="card  w-96 shadow-xl mx-auto mt-10">
      <div className="card-body">
        <h2 className="card-title text-xl">Login!</h2>
        <div>
          <Input
            labelName="Email"
            value={email}
            onChange={(value) => setEmail(value)}
          />
          <Input
            labelName="Password"
            value={password}
            onChange={(value) => setPassword(value)}
          />
        </div>
        <div className="card-actions justify-center mt-6 w-full">
          <button className="btn btn-primary w-[70%] text-xl" onClick={handleSubmit}>Login</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
