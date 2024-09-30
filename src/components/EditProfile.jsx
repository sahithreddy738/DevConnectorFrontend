import { useState } from "react";
import Input from "./Input";
import PropTypes from "prop-types";
import axios from "axios";
import { UPDATE_PROFILE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/slices/userSlice";

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
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="card bg-base-300 w-96 shadow-xl  mt-2 mx-auto">
      <div className="card-body">
        <h2 className="card-title text-xl">Edit Profile</h2>
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
              <span className="label-text">about</span>
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
            className="btn btn-primary w-[70%] text-xl"
            onClick={updateProfile}
          >
            Save Profile
          </button>
        </div>
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
