import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { LOGOUT_URL } from "../utils/constants";
import { removeUser } from "../utils/slices/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Bell, MessageSquareMore } from "lucide-react";
import { useState } from "react";
import { removeNotification } from "../utils/slices/notificationsSlice";
import { removeSelectedChat } from "../utils/slices/chatSlice";

const NavBar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isNotification, setIsNotification] = useState(false);
  const notifications = useSelector((store) => store.notification);
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
  const handleNotification = (notfi) => {
    const notification = notifications.find((n) => n._id === notfi._id);
    if (notification) {
      console.log(notification);
      navigate(`/chats/${notification.chat._id}`);
      dispatch(removeNotification(notification.sender._id));
      setIsNotification(false);
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
        <div className="flex-none items-center gap-2 relative">
          <p className="hidden sm:block">Welcome {user?.firstName}</p>
          <div className="flex items-center gap-2 p-1">
            <Link to={"/chats"} onClick={()=>dispatch(removeSelectedChat())}>
              <MessageSquareMore className="h-8 w-8 md:h-6 md:w-6 md:mt-1 mt-2" />
            </Link>
            <button onClick={() => setIsNotification(!isNotification)}>
              {notifications && notifications.length > 0 && (
                <div className="notification-badge">
                  <span className="badge">{notifications.length}</span>
                </div>
              )}
                <Bell className="h-8 w-8 md:h-6 md:w-6 md:mt-1 mt-2" />
            </button>
          </div>
          {isNotification && (
            <div className="w-auto absolute right-10 top-14 bg-white p-1 rounded-md text-emerald-500 font-semibold md:text-base text-xl">
              <div className="w-full flex flex-col gap-y-2">
                {notifications && notifications.length === 0 ? (
                  <p>No Notifications</p>
                ) : (
                  notifications.map((notification) => (
                    <div
                      className="w-full px-2 py-1 rounded-md hover:bg-slate-200 cursor-pointer"
                      key={notification._id}
                      onClick={() => handleNotification(notification)}
                    >
                      New Message from {notification?.sender?.firstName}
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
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
              className="menu menu-sm dropdown-content bg-base-300 rounded-box z-[1] mt-3 w-52 p-2 shadow md:text-base text-2xl"
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
