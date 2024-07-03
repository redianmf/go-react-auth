// React
import { createBrowserRouter } from "react-router-dom";

// Pages
import Auth from "../pages/auth/Auth";
import Home from "../pages/home/Home";

export const router = createBrowserRouter([
  {
    id: "root",
    path: "/",
    children: [
      {
        path: "auth",
        Component: Auth,
      },
      {
        index: true,
        Component: Home,
      },
    ],
  },
]);
