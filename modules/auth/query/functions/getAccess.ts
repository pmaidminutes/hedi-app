import { expiryObject } from "../utils";
import { requestToken } from "../requests";
import { IAuth } from "../../types";
import { IsIHTTPError } from "@/modules/common/error";

export async function getAccess(
  username: string,
  password: string,
  csrfToken: string
) {
  const response = await requestToken(username, password, csrfToken);
  if (IsIHTTPError(response)) return response;

  const { iat, exp } = expiryObject(response.expires_in);

  return {
    name: username,
    accessToken: response.access_token,
    iat,
    exp,
    refreshToken: response.refresh_token,
    csrfToken,
  } as IAuth;
}
