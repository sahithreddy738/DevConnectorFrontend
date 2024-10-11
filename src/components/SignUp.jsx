import React, { useState } from "react";
import Input from "./Input";
import axios from "axios";
import { SIGNUP_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUser } from "../utils/slices/userSlice";

const SignUp = () => {
  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [errorMessage,setErrorMessage]=useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const hanldeUser = (value, field) => {
    setNewUser((prevUser) => ({
      ...prevUser,
      [field]: value,
    }));
  };
  const handleSubmit = async () => {
    try {
      const res = await axios.post(SIGNUP_URL, newUser, {
        withCredentials: true,
      });
      dispatch(addUser(res.data.newUser));
      setErrorMessage("");
      navigate("/profile");
    } catch (err) {
      console.log(err);
      setErrorMessage(err.response.data);
    }
  };
  return (
  <div className="w-full h-[80%]">
    <div className="card  w-96 shadow-xl bg-zinc-300 mx-auto mt-4">
      <div className="card-body">
        <h2 className="card-title text-2xl font-bold">Sign Up!</h2>
        <div>
          <Input
            labelName="firstName"
            value={newUser.firstName}
            onChange={(value) => hanldeUser(value,"firstName")}
          />
          <Input
            labelName="lastName"
            value={newUser.lastName}
            onChange={(value) => hanldeUser(value,"lastName")}
          />
          <Input
            labelName="Email"
            value={newUser.email}
            onChange={(value) => hanldeUser(value,"email")}
          />
          <Input
            labelName="Password"
            value={newUser.password}
            onChange={(value) => hanldeUser(value, "password")}
          />
        </div>
        <p className="text-red-500 ml-2">{errorMessage}</p>
        <div className="card-actions justify-center mt-4 w-full">
          <button
            className="btn btn-primary w-[70%] text-xl"
            onClick={handleSubmit}
          >
            SignUp
          </button>
        </div>
        <p
          className="text-center text-base font-semibold cursor-pointer mt-2"
          onClick={() => {navigate("/login")
            setErrorMessage("");
          }}
        >
          Existing User?Login
        </p>
      </div>
    </div>
    </div>
  );
};

export default SignUp;
