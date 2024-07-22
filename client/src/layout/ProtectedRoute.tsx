import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const accessToken = localStorage.accessToken;
  const refreshToken = localStorage.refreshToken;
  const isAuth = accessToken && refreshToken;

  // Clear localstorage
  if (!isAuth) localStorage.clear();

  // Logout function

  return isAuth ? <Outlet /> : <Navigate to="/auth" replace />;
};

export default ProtectedRoute;
