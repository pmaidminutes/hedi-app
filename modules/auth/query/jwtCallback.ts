import { IsIHTTPError } from "@/modules/common/error";
import { User } from "next-auth";
import { JWT } from "next-auth/jwt";
import { WithAdditionalParams } from "next-auth/_utils";
import { IUserAuth } from "../types";
import { tryRefresh } from "./functions";
import { getExpires } from "./utils";

// https://next-auth.js.org/tutorials/refresh-token-rotation
// our case works a little differnt, since we are using credentials provider
// tokens are either available on user on first login
// or on token itself
export const jwt = async (
  token: JWT | IUserAuth,
  user: User | IUserAuth,
  account: Record<string, any>,
  profile: Record<string, any>,
  isNewUser: boolean
): Promise<WithAdditionalParams<JWT>> => {
  // Initial sign in
  if (account?.type) {
    // account empty if call was not preceded by a login
    if (account.type === "credentials") {
      const auth = user as IUserAuth;
      token = { ...token, ...user };
    } else {
      // in case of other providers, untested
      token = {
        ...token,
        ...account,
        ...getExpires(account.expires_in),
        ...user,
      };
    }
  }

  // returns token itself or tries refresh
  const refresh = await tryRefresh(token as IUserAuth);
  if (!IsIHTTPError(refresh)) return refresh;

  throw refresh;
};
