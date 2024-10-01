import { useSelector } from "react-redux";
import EditProfile from "./EditProfile";

const Profile = () => {
  const user=useSelector((store)=>store.user);
  return (
    <div className="bg-zinc-300 w-full h-full">
      {user && <EditProfile user={user}/>}
    </div>
  );
};

export default Profile;
