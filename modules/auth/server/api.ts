import { NextApiResponse, NextApiRequest } from "next";
import NextAuth from "next-auth";
import { getToken } from "next-auth/jwt";
import { getOptions } from "./serviceInitOptions";
import { toAuthHeader } from "../query";
import { IAuthHeader, IUserAuth } from "../types";

export const withAuth = async (
  req: NextApiRequest,
  res: NextApiResponse,
  debug?: boolean
) => {
  return NextAuth(req, res, getOptions(debug));
};

export const getUserAuth = async (
  req: NextApiRequest
): Promise<IUserAuth | null> => {
  const secret = process.env.NEXTAUTH_JWT_SECRET;
  return secret ? (getToken({ req, secret }) as Promise<IUserAuth>) : null;
};

export const getUserAuthHeader = async (
  req: NextApiRequest
): Promise<IAuthHeader | null> => {
  const auth = await getUserAuth(req);
  return auth ? toAuthHeader(auth) : null;
};
