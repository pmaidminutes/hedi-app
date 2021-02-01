import * as querystring from "querystring";
import { ITokenResponse } from "./types";
import { toCSRFObject } from "../utils";

export async function requestRefresh(refreshToken: string, csrfToken: string) {
  const body = {
    grant_type: "refresh_token",
    refresh_token: refreshToken,
    client_id: process.env.NEXTAUTH_CMS_ID,
    client_secret: process.env.NEXTAUTH_CMS_SECRET,
  };

  return fetch(process.env.CMS_URL + "/oauth2/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      ...toCSRFObject(csrfToken),
    },
    body: querystring.stringify(body),
  }).then(res => res.json() as Promise<ITokenResponse>);
}
