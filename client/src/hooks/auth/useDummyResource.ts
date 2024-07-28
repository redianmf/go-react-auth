import { useState } from "react";
import { API } from "../../config/api";

import { DUMMY_RES } from "../../config/endpoints";
import { handleError } from "../../helper/handleError";

const useDummyResource = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");

  const handleGetDummyRes = async () => {
    try {
      setErrorMsg("");
      setIsLoading(true);
      const res = await API.get(DUMMY_RES);

      console.log(res.data);
    } catch (error) {
      const errMsg = handleError(error);
      setErrorMsg(handleError(errMsg));
    } finally {
      setIsLoading(false);
    }
  };

  return { handleGetDummyRes, isLoading, errorMsg };
};

export default useDummyResource;
