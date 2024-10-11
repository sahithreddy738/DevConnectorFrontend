import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GET_USER_PROFILE } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { getProfileById } from "../utils/slices/profileSlice";

const ViewProfile = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const profile = useSelector((store) => store.profile);
  const fetchProfileById = async () => {
    try {
      const profileData = await axios.get(GET_USER_PROFILE + userId, {
        withCredentials: true,
      });
      dispatch(getProfileById(profileData.data.user));
    } catch (err) {
      console.log(err);
    }
  };
  const navigate=useNavigate();
  useEffect(() => {
    fetchProfileById();
  }, []);
  if (!profile)
    return <p className="font-bold text-center text-2xl">Fetching Details</p>;
  return (
    <div>
    <div
        className="m-4 w-14 md:w-16  cursor-pointer"
        onClick={()=>navigate(-1)}
      >
        <img src="/Netflixleft_arrow.png" alt="left-arrow" className="bg-cover" />
      </div>
    <div className="bg-white rounded-xl flex flex-col w-[80%] mx-auto p-4  mt-10 lg:flex-row lg:w-[75%] lg:space-x-4 lg:">
      <div className="w-[50%] h-52 mx-auto lg:w-[30%] lg:h-72 lg:m-4">
        <img
          src={profile.photoURL}
          alt="profile-pic"
          className="w-full h-full rounded-2xl lg:rounded-md"
        ></img>
      </div>
      <div className="mt-4 lg:m-4 lg:w-[70%]">
        <div className="flex flex-row space-x-4 text-lg font-bold mb-2 lg:text-2xl">
          <p>{profile.firstName}</p>
          <p>{profile.lastName}</p>
        </div>
        <div className="flex flex-row space-x-4 text-lg font-bold mb-2 lg:text-2xl">
          <p>{profile.age && profile.age}</p>
          <p>{profile.gender && profile.gender}</p>
        </div>
        <div className="flex flex-row flex-wrap space-x-2 mb-2">{profile.skills.map((skill) => (
          <p className="text-lg font-bold lg:text-xl" key={skill}>
            {skill}
          </p>
        ))}</div>
        <p className="text-lg font-semibold mb-2 lg:text-lg">{profile?.about}</p>
      </div>
    </div>
    </div>
  );
};

export default ViewProfile;
