import axios from "axios";
import { httpErrorMessage } from "./httpErrorMessage";

export const handleError = (err: unknown) => {
  if (!axios.isAxiosError(err)) return err;

  const { response } = err;

  if (response && response.status) {
    const message = response.data && response?.data?.error?.message;

    const isClientError = Boolean(
      response?.status?.toString()?.startsWith("4")
    );

    const errorText = isClientError
      ? message
      : httpErrorMessage[response.status];

    return errorText;
  } else {
    return "Cannot connect to the server, Check your internet network";
  }
};
