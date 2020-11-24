import { requestCSRF } from "../requests";
import { IsIHTTPError } from "../requests/types";
import { getAccess } from "./getAccess";

export async function authorizeService(username: string, password: string) {
  const csrfResponse = await requestCSRF();
  if (IsIHTTPError(csrfResponse)) return csrfResponse;

  return getAccess(username, password, csrfResponse);
}
