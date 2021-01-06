import { expiryObject, oauthNow } from "../utils";
import { requestRefresh } from "../requests";
import { IAuth } from "../../types";

export async function tryRefresh<T extends IAuth>(auth: T) {
  if (oauthNow() < auth.exp - 30) return auth;

  const { refreshToken, csrfToken } = auth;
  const tokenResp = await requestRefresh(refreshToken, csrfToken);
  if (!tokenResp.access_token) return null;

  const { iat, exp } = expiryObject(tokenResp.expires_in);

  return {
    ...auth,
    accessToken: tokenResp.access_token,
    refreshToken: tokenResp.refresh_token,
    iat,
    exp,
  } as IAuth;
}
