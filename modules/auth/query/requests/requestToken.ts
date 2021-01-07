import * as querystring from "querystring";
import { ITokenResponse } from "./types";
import { toCSRFObject } from "../utils";
import { IHTTPError } from "@/common/types";

export async function requestToken(
  username: string,
  password: string,
  csrfToken: string
) {
  const body = {
    grant_type: "password",
    username,
    password,
    scope: "profile email openid offline_access",
    client_id: process.env.NEXTAUTH_CMS_ID,
    client_secret: process.env.NEXTAUTH_CMS_SECRET,
  };

  const response = await fetch(process.env.NEXTAUTH_CMS_URL + "/oauth2/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      ...toCSRFObject(csrfToken),
    },
    body: querystring.stringify(body),
  });
  if (response.status === 200)
    return response.json() as Promise<ITokenResponse>;
  else
    return { code: response.status, text: response.statusText } as IHTTPError;
}
