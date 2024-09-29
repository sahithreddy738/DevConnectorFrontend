import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { LOGOUT_URL } from "../utils/constants";
import { removeUser } from "../utils/slices/userSlice";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const user=useSelector((store)=>store.user);
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const handleLogout=async ()=>{
   try{
    const res=await axios.post(LOGOUT_URL);
    dispatch(removeUser());
    console.log(res.data);
    navigate("/login");
   } catch(err) {
    console.log(err);
   }
  }
  return (
    <div className="navbar bg-black " data-theme="halloween">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">DevConnector</a>
      </div>
      {user && <div className="flex-none gap-4">
         <p>Welcome {user?.firstName}</p>
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <a onClick={handleLogout}>Logout</a>
            </li>
          </ul>
        </div>
      </div>}
    </div>
  );
};

export default NavBar;
