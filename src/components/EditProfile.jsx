import { useState } from "react";
import Input from "./Input";
import PropTypes from "prop-types";
import axios from "axios";
import { UPDATE_PROFILE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/slices/userSlice";
import UserCard from "./UserCard";
import { toast } from "react-toastify";
import ProfileUserCard from "./ProfileUserCard";

const EditProfile = ({ user }) => {
  const [updateUser, setUpdateUser] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    age: user?.age || 18,
    gender: user.gender || " ",
    about: user.about,
    photoURL: user.photoURL,
    skills: user.skills,
  });
  const dispatch=useDispatch();
  const handleUpdateField = (value, field) => {
    setUpdateUser((prevUser) => ({
      ...prevUser,
      [field]: value,
    }));
  };
  const handleSkillsUpdate = (value) => {
    setUpdateUser((prevUser) => ({
      ...prevUser,
      skills: value.split(","),
    }));
  };
  const updateProfile = async () => {
    try {
      const res = await axios.patch(
        UPDATE_PROFILE_URL,
        { ...updateUser, age: parseInt(updateUser.age) },
        { withCredentials: true }
      );
     dispatch(addUser(res.data.user));
     toast.success("Profile Updated");
    } catch (err) {
      toast.error(`Error:Invalid Details`);
    }
  };
  return (
    <div className="flex sm:flex-row justify-center sm:justify-normal lg:justify-normal sm:gap-6 lg:space-x-4  w-full h-[700px] sm:h-[700px] lg:h-[700px]">
    <div className="card bg-zinc-300  h-[100%] w-[90%] mx-3 sm:w-[45%] lg:w-[35%] sm:ml-10 lg:ml-48 shadow-xl  mt-8">
      <div className="card-body">
        <h2 className="card-title text-3xl">Edit Profile</h2>
        <div>
          <div className="flex flex-row space-x-2">
            <Input
              labelName="firstName"
              value={updateUser.firstName}
              onChange={(value) => handleUpdateField(value, "firstName")}
            />
            <Input
              labelName="lastName"
              value={updateUser.lastName}
              onChange={(value) => handleUpdateField(value, "lastName")}
            />
          </div>
          <div className="flex flex-row space-x-2">
            <Input
              labelName="age"
              value={updateUser.age}
              onChange={(value) => handleUpdateField(value, "age")}
            />
            <Input
              labelName="gender"
              value={updateUser.gender}
              onChange={(value) => handleUpdateField(value, "gender")}
            />
          </div>
          <Input
            labelName="photoURL"
            value={updateUser.photoURL}
            onChange={(value) => handleUpdateField(value, "photoURL")}
          />
          <Input
            labelName="skills"
            value={updateUser.skills.join(",")}
            onChange={(value) => handleSkillsUpdate(value)}
          />
          <label className="form-control">
            <div className="label">
              <span className="label-text text-lg font-semibold">about</span>
            </div>
            <textarea
              className="textarea textarea-bordered h-24"
              value={updateUser.about}
              onChange={(e) => handleUpdateField(e.target.value, "about")}
            ></textarea>
          </label>
        </div>
        <div className="card-actions justify-center mt-6 w-full">
          <button
            className="btn btn-primary sm:w-[60%] lg:w-[50%] text-xl"
            onClick={updateProfile}
          >
            Save Profile
          </button>
        </div>
      </div>
    </div>
     <div className="hidden sm:block sm:w-[40%] lg:[50%]">
     <ProfileUserCard user={updateUser}/>
     </div>
    </div>
  );
};
EditProfile.propTypes = {
  user: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    age: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    gender: PropTypes.string,
    about: PropTypes.string,
    photoURL: PropTypes.string,
    skills: PropTypes.arrayOf(PropTypes.string),
  }),
};

export default EditProfile;
