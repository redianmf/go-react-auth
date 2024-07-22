import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../../config/api";

import { LOGOUT_URL } from "../../config/endpoints";
import { handleError } from "../../helper/handleError";

const useLogout = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");

  const handleLogout = async () => {
    try {
      setErrorMsg("");
      setIsLoading(true);
      await API.post(LOGOUT_URL);

      // Clear data
      localStorage.clear();

      // Redirect homepage
      navigate("/auth");
    } catch (error) {
      const errMsg = handleError(error);
      setErrorMsg(handleError(errMsg));
    } finally {
      setIsLoading(false);
    }
  };

  return { handleLogout, isLoading, errorMsg };
};

export default useLogout;
