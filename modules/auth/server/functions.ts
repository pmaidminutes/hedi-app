import { NextApiRequest } from "next";
import { getToken } from "next-auth/jwt";
import { IHTTPError, IsIHTTPError } from "@/modules/common/error";
import { IAuthHeader, IUserAuth, IUserInfoResponse } from "../types";
import { toAuthHeader } from "./oauth";

const getUserAuth = async (
  req: NextApiRequest
): Promise<IUserAuth | IHTTPError> => {
  if (!process.env.NEXTAUTH_JWT_SECRET)
    throw new Error("FATAL: nextauth misconfigured");
  const secret = process.env.NEXTAUTH_JWT_SECRET;
  return getToken({ req, secret }).catch<IHTTPError>(e => e) as Promise<
    IUserAuth | IHTTPError
  >;
};

export const getUserAuthHeader = async (
  req: NextApiRequest
): Promise<IAuthHeader | null> => {
  const auth = await getUserAuth(req);
  if (IsIHTTPError(auth)) {
    console.error(auth);
    return null;
  }
  return toAuthHeader(auth);
};

export const getUserInfo = async (
  req: NextApiRequest
): Promise<Pick<IUserInfoResponse, "name" | "email"> | null> => {
  const auth = await getUserAuth(req);
  if (IsIHTTPError(auth)) {
    console.error(auth);
    return null;
  }
  const { name, email } = auth;
  return { name, email };
};
