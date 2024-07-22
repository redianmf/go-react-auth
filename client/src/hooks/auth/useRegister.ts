import { useState } from "react";
import { API } from "../../config/api";

import { REGISTER_URL } from "../../config/endpoints";
import { handleError } from "../../helper/handleError";
import { RegisterProps } from "../../types/types";

const useRegister = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [successMsg, setSuccessMsg] = useState<string>("");

  const handleRegister = async (payload: RegisterProps) => {
    try {
      setErrorMsg("");
      setIsLoading(true);
      const res = await API.post(REGISTER_URL, payload);
      setSuccessMsg(res?.data?.message);
    } catch (error) {
      const errMsg = handleError(error);
      setErrorMsg(handleError(errMsg));
    } finally {
      setIsLoading(false);
    }
  };

  return { handleRegister, isLoading, errorMsg, successMsg };
};

export default useRegister;
