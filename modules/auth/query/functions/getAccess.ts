import { requestToken } from "../requests";
import { IAuth } from "../../types";
import { IsIHTTPError } from "@/modules/common/error";
import { getExpires } from "../utils";

export async function getAccess(
  username: string,
  password: string,
  csrfToken: string
) {
  const response = await requestToken(username, password, csrfToken);
  if (IsIHTTPError(response)) return response;

  return {
    name: username,
    accessToken: response.access_token,
    ...getExpires(response.expires_in),
    refreshToken: response.refresh_token,
    csrfToken,
  } as IAuth;
}
