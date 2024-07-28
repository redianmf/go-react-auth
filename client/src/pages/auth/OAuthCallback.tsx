import { useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { API } from "../../config/api";

import { TbFidgetSpinner } from "react-icons/tb";

import { CALLBACK_URL_GOOGLE } from "../../config/endpoints";

const OAuthCallback = () => {
  const isProcessed = useRef(false);
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const accessToken = localStorage.accessToken;
  const refreshToken = localStorage.refreshToken;
  const isAuth = accessToken && refreshToken;

  const handleOAuthCallback = async () => {
    try {
      const googleCode = params.get("code");
      const res = await API.post(`${CALLBACK_URL_GOOGLE}?code=${googleCode}`);
      console.log(res, "res callback");

      const { token, user } = res?.data?.data || {};

      // Set token
      localStorage.accessToken = token?.access_token;
      localStorage.refreshToken = token?.refresh_token;
      localStorage.user = JSON.stringify(user);

      // Redirect homepage
      navigate("/");
    } catch (error) {
      localStorage.clear();
      navigate("/auth");
    }
  };

  useEffect(() => {
    async function processOAuthResponse() {
      // this is needed, because React.StrictMode makes component to rerender
      // second time the auth code that is in req.url here is invalid,
      // so we want it to execute one time only.
      if (isProcessed.current) {
        return;
      }

      isProcessed.current = true;

      if (isAuth) return navigate("/");

      await handleOAuthCallback();
    }

    processOAuthResponse();
  }, []);

  return (
    <div className="h-screen bg-slate-800 flex justify-center items-center">
      <p className="text-white text-5xl font-body">Loading</p>
      <TbFidgetSpinner className="spinner ml-3 text-5xl text-white" />
    </div>
  );
};

export default OAuthCallback;
