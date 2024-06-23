// React
import { createBrowserRouter } from "react-router-dom";

// Pages
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";

export const router = createBrowserRouter([
  {
    id: "root",
    path: "/",
    children: [
      {
        path: "login",
        Component: Login,
      },
      {
        index: true,
        Component: Home,
      },
    ],
  },
]);
