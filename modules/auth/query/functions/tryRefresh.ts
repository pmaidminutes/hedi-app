import { getExpires } from "../utils";
import { requestRefresh } from "../requests";
import { IAuth } from "../../types";
//https://next-auth.js.org/tutorials/refresh-token-rotation
export async function tryRefresh<T extends IAuth>(auth: T) {
  if (Date.now() < auth.accessTokenExpires - 500) return auth;

  const { refreshToken, csrfToken } = auth;
  const tokenResp = await requestRefresh(refreshToken, csrfToken);
  if (!tokenResp.access_token) return null;

  return {
    ...auth,
    accessToken: tokenResp.access_token,
    ...getExpires(tokenResp.expires_in),
    refreshToken: tokenResp.refresh_token,
  } as IAuth;
}
