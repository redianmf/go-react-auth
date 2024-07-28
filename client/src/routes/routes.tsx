// React
import { createBrowserRouter } from "react-router-dom";

// Layout
import ProtectedRoute from "../layout/ProtectedRoute";

// Utils
import OAuthCallback from "../pages/auth/OAuthCallback";

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
        path: "auth/google/callback",
        Component: OAuthCallback,
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
