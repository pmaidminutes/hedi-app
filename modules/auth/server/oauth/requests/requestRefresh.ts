import * as querystring from "querystring";
import { ITokenResponse } from "./types";
import { toCSRFObject } from "../utils";
import { IHTTPError } from "@/modules/common/error";

export async function requestRefresh(refreshToken: string, csrfToken: string) {
  const body = {
    grant_type: "refresh_token",
    refresh_token: refreshToken,
    client_id: process.env.NEXTAUTH_CMS_ID,
    client_secret: process.env.NEXTAUTH_CMS_SECRET,
  };

  const response = await fetch(process.env.CMS_URL + "/oauth2/token", {
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
    return {
      status: response.status,
      message: response.statusText,
    } as IHTTPError;
}
