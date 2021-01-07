import { IsIHTTPError } from "@/common/errorHandling";
import { toAuthHeader } from "./utils";
import { authorizeService } from "./authorizeService";

export const queryServiceAuthHeader = async (
  username: string,
  password: string
) => {
  const auth = await authorizeService(username, password);
  return IsIHTTPError(auth) ? auth : toAuthHeader(auth);
};
