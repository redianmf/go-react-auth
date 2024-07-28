import { IRenewToken } from "../types/interfaces";
import { API } from "./api";
import { REFRESH_TOKEN_URL } from "./endpoints";

export const renewToken = async (
  refreshToken: string
): Promise<IRenewToken> => {
  const response = await API.post(REFRESH_TOKEN_URL, {
    refresh_token: refreshToken,
  });

  const newAccessToken = response?.data?.data?.token?.access_token;
  const newRefreshToken = response?.data?.data?.token?.refresh_token;

  return { newAccessToken, newRefreshToken };
};
