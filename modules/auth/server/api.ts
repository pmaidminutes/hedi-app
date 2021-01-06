import { IsIHTTPError } from "@/common/errorHandling";
import { NextApiResponse, NextApiRequest } from "next";
import NextAuth from "next-auth";
import { getToken } from "next-auth/jwt";
import { getOptions } from "./serviceInitOptions";
import { authorizeService } from "../query";
import { toAuthHeader } from "./utils";
import { IAuth, IAuthHeader, IUserAuth } from "../types";

export const withAuth = async (
  req: NextApiRequest,
  res: NextApiResponse,
  debug?: boolean
) => {
  return NextAuth(req, res, getOptions(debug));
};

export const getUserAuth = async (req: NextApiRequest) => {
  const secret = process.env.NEXTAUTH_JWT_SECRET;
  return secret ? (getToken({ req, secret }) as Promise<IUserAuth>) : null;
};

export const getUserAuthHeader = async (
  req: NextApiRequest
): Promise<IAuthHeader | {}> => {
  const auth = await getUserAuth(req);
  return auth ? toAuthHeader(auth) : {};
};

export const getServiceAuth = async (username: string, password: string) => {
  const auth = await authorizeService(username, password);
  return IsIHTTPError(auth) ? null : auth;
};

export const getAuthHeader = (auth: IAuth) => {
  return toAuthHeader(auth);
};
