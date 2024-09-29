import { createBrowserRouter } from "react-router-dom";
import Body from "../components/Body";
import Login from "../components/Login";
import Profile from "../components/Profile";
import App from "../App";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element:<App/>,
    children: [
      {
        path: "/",
        element: <Body />,
        children: [
          {
            path: "/login",
            element: <Login />,
          },
          {
            path: "/profile",
            element: <Profile />,
          },
        ],
      },
    ],
  },
]);

export default appRouter;
