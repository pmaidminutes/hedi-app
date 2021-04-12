import { requestUserInfo } from "./requests";
import { IUserAuth } from "../../types";
import { getAccess } from "./functions";
import { IsIHTTPError } from "@/modules/common/error";

export async function authorizeWithCredentials(
  username: string,
  password: string,
  csrfToken: string
) {
  const accessResp = await getAccess(username, password, csrfToken);
  if (IsIHTTPError(accessResp)) return accessResp;

  const userInfoResp = await requestUserInfo(accessResp.accessToken, csrfToken);
  if (IsIHTTPError(userInfoResp)) return userInfoResp;

  return {
    ...accessResp,
    id: userInfoResp.name + "_" + userInfoResp.sub,
    name: userInfoResp.name,
    email: userInfoResp.email,
  } as IUserAuth;
}
