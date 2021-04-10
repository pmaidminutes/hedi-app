import { IsIHTTPError } from "@/modules/common/error";
import { toAuthHeader } from "./utils";
import { authorizeService } from "./authorizeService";

export const queryServiceAuthHeader = async (
  username: string,
  password: string
) => {
  const cached = process.env[username];
  if (cached) {
    // TODO handle refresh !
    return toAuthHeader(JSON.parse(cached));
  } else {
    const auth = await authorizeService(username, password);
    if (IsIHTTPError(auth)) return auth;
    else {
      process.env[username] = JSON.stringify(auth);
      return toAuthHeader(auth);
    }
  }
};
