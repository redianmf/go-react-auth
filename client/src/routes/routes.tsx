// React
import { createBrowserRouter } from "react-router-dom";

// Layout
import ProtectedRoute from "../layout/ProtectedRoute";

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
        element: <ProtectedRoute />,
        children: [
          {
            index: true,
            Component: Home,
          },
        ],
      },
    ],
  },
]);
