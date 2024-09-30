import { useSelector } from "react-redux";
import EditProfile from "./EditProfile";

const Profile = () => {
  const user=useSelector((store)=>store.user);
  return (
    <div className=" bg-base-100">
      {user && <EditProfile user={user}/>}
    </div>
  );
};

export default Profile;
