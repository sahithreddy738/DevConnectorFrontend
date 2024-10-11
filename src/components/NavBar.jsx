import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { LOGOUT_URL } from "../utils/constants";
import { removeUser } from "../utils/slices/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const NavBar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await axios.post(LOGOUT_URL, {}, { withCredentials: true });
      dispatch(removeUser());
      toast.success("Loggedout Successfully");
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="navbar bg-black w-full h-[10%]" data-theme="halloween">
      <div className="flex-1">
        {user ? (
          <Link
            to="/"
            className="btn btn-ghost text-2xl text-red-500 font-bold transition-transform duration-300 ease-in-out hover:scale-110"
          >
            DevConnector
          </Link>
        ) : (
          <Link className="btn btn-ghost text-2xl text-red-500 font-bold transition-transform duration-300 ease-in-out hover:scale-110">
            DevConnector
          </Link>
        )}
      </div>
      {user && (
        <div className="flex-none gap-2">
          <p className="hidden sm:block">Welcome {user?.firstName}</p>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img alt="Tailwind CSS Navbar component" src={user?.photoURL} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-300 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/profile" className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li>
                <Link to="/connections">Connections</Link>
              </li>
              <li>
                <Link to="/requests">Requests</Link>
              </li>
              <li>
                <Link onClick={handleLogout}>Logout</Link>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;
