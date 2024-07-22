import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../../config/api";

import { LOGIN_URL } from "../../config/endpoints";
import { handleError } from "../../helper/handleError";
import { LoginProps } from "../../types/types";

const useLogin = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");

  const accessToken = localStorage.accessToken;
  const refreshToken = localStorage.refreshToken;
  const isAuth = accessToken && refreshToken;

  const handleLogin = async (payload: LoginProps) => {
    try {
      setErrorMsg("");
      setIsLoading(true);
      const res = await API.post(LOGIN_URL, payload);

      const { token, user } = res?.data?.data || {};

      // Set token
      localStorage.accessToken = token?.access_token;
      localStorage.refreshToken = token?.refresh_token;
      localStorage.user = JSON.stringify(user);

      // Redirect homepage
      navigate("/");
    } catch (error) {
      const errMsg = handleError(error);
      setErrorMsg(handleError(errMsg));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isAuth) navigate("/");
  }, []);

  return { handleLogin, isLoading, errorMsg };
};

export default useLogin;
