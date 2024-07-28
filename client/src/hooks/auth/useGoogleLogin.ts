import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../../config/api";

import { LOGIN_URL_GOOGLE } from "../../config/endpoints";

const useGoogleLogin = () => {
  const navigate = useNavigate();
  const [isLoadingGoogleOauth, setIsLoadingGoogleOauth] =
    useState<boolean>(false);
  const [errorMsgGoogleOauth, setErrorMsgGoogleOauth] = useState<string>("");

  const accessToken = localStorage.accessToken;
  const refreshToken = localStorage.refreshToken;
  const isAuth = accessToken && refreshToken;

  const handleGoogleLogin = async () => {
    if (isAuth) navigate("/");

    try {
      setErrorMsgGoogleOauth("");
      setIsLoadingGoogleOauth(true);
      const res = await API.get(LOGIN_URL_GOOGLE);
      window.location = res?.data?.url;
    } catch (error) {
      setErrorMsgGoogleOauth("Error login");
    } finally {
      setIsLoadingGoogleOauth(false);
    }
  };

  return { handleGoogleLogin, isLoadingGoogleOauth, errorMsgGoogleOauth };
};

export default useGoogleLogin;
