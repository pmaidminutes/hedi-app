import { IHTTPError, IsIHTTPError } from "@/modules/common/error";
import { IAuth } from "../types";
import { authorizeService, toAuthHeader } from "./oauth";
import { tryRefresh } from "./oauth/functions";

export async function getServiceAuth() {
  const auth = await getService();
  if (IsIHTTPError(auth)) return auth;
  return toAuthHeader(auth);
}

async function getService(): Promise<IAuth | IHTTPError> {
  if (!process.env.SERVICE_AUTH) {
    if (!process.env.SERVICE_USER || !process.env.SERVICE_SECRET)
      throw new Error("FATAL: no service configured");

    const username = process.env.SERVICE_USER;
    const password = process.env.SERVICE_SECRET;

    const auth = await authorizeService(username, password);
    if (IsIHTTPError(auth)) return auth;
    else {
      process.env.SERVICE_AUTH = JSON.stringify(auth);
      return auth;
    }
  } else {
    const cachedAuth = JSON.parse(process.env.SERVICE_AUTH);
    const refreshedAuth = await tryRefresh(cachedAuth);
    if (cachedAuth !== refreshedAuth)
      process.env.SERVICE_AUTH = JSON.stringify(refreshedAuth);
    return refreshedAuth;
  }
}
