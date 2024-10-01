import { useState } from "react";
import Input from "./Input";
import axios from "axios";
import { LOGIN_URL, UPDATE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/slices/userSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = async () => {
    try {
      const res = await axios.post(
        LOGIN_URL,
        { email: email, password: password.trim() },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      navigate("/");
      setErrorMessage("");
    } catch (err) {
      console.log(err);
      setErrorMessage(err.response.data);
    }
  };
  const handleForgotPassword = async () => {
    try {
      await axios.patch(
        UPDATE_URL,
        { email: email, newPassword: password.trim() },
        { withCredentials: true }
      );
      setShowForgotPassword(false);
      setErrorMessage("");
    } catch (err) {
      console.log(err);
      setErrorMessage(err.response.data);
    }
  };
  return (
    <div className="w-full h-[80%]">
    <div className="card  w-96 shadow-xl mx-auto mt-10 bg-zinc-300">
      <div className="card-body">
        <h2 className="card-title text-2xl font-bold">
          {showForgotPassword ? "Forgot Password" : "Login"}
        </h2>
        <div>
          <Input
            labelName="Email"
            value={email}
            onChange={(value) => setEmail(value)}
          />
          {showForgotPassword ? (
            <Input
              labelName="New Password"
              value={password}
              onChange={(value) => setPassword(value)}
            />
          ) : (
            <Input
              labelName="Password"
              value={password}
              onChange={(value) => setPassword(value)}
            />
          )}
        </div>
        {showForgotPassword ? (
          <></>
        ) : (
          <p
            className="text-end text-base font-semibold text-emerald-950 mt-2 cursor-pointer"
            onClick={() => {
              setShowForgotPassword(true);
              setErrorMessage("");
            }}
          >
            Forgot Password?
          </p>
        )}
        <p className="text-red-500 ml-2">{errorMessage}</p>

        <div className="card-actions justify-center mt-6 w-full">
          <button
            className="btn btn-primary w-[70%] text-xl"
            onClick={showForgotPassword ? handleForgotPassword : handleSubmit}
          >
            {showForgotPassword ? "Update Password" : "Login"}
          </button>
        </div>
        {showForgotPassword ? (
          <p
            className="text-center font-semibold text-base cursor-pointer mt-2"
            onClick={() => {
              setShowForgotPassword(false);
              setErrorMessage("");
            }}
          >
            Remember Password?Login
          </p>
        ) : (
          <p
            className="text-center cursor-pointer mt-2"
            onClick={() => navigate("/signup")}
          >
            New User?SignUp
          </p>
        )}
      </div>
    </div>
    </div>
  );
};

export default Login;
