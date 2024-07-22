import { useState } from "react";
import { API } from "../../config/api";

import { LOGIN_URL } from "../../config/endpoints";
import { handleError } from "../../helper/handleError";
import { LoginProps } from "../../types/types";

const useLogin = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");

  const handleLogin = async (payload: LoginProps) => {
    try {
      setErrorMsg("");
      setIsLoading(true);
      await API.post(LOGIN_URL, payload);
    } catch (error) {
      const errMsg = handleError(error);
      setErrorMsg(handleError(errMsg));
    } finally {
      setIsLoading(false);
    }
  };

  return { handleLogin, isLoading, errorMsg };
};

export default useLogin;
