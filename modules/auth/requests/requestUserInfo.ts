import { IHTTPError, IUserInfoResponse } from "./types";
import { authHeader } from "../utils";

export async function requestUserInfo(accessToken: string, csrfToken: string) {
  const response = await fetch(
    process.env.NEXTAUTH_CMS_URL + "/oauth2/UserInfo",
    {
      method: "GET",
      headers: authHeader({ accessToken, csrfToken }),
    }
  );
  if (response.status === 200)
    return response.json() as Promise<IUserInfoResponse>;
  else
    return { code: response.status, text: response.statusText } as IHTTPError;
}
