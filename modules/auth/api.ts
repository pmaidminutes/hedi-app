import { NextApiResponse, NextApiRequest } from "next";
import NextAuth from 'next-auth';
import { getToken } from 'next-auth/jwt';
import { authorizeService, IUserAuth } from './flow';
import { getOptions } from './initOptions';
import { IsIHTTPError } from "./requests";
import { authHeader } from './utils';

export const withAuth = async (req: NextApiRequest, res: NextApiResponse, debug?: boolean) => {
  return NextAuth(req, res, getOptions(debug));
}

export const getUserAuth = async (req: NextApiRequest) => {
  const secret = process.env.NEXTAUTH_JWT_SECRET;
  return (secret) ? getToken({req, secret}) as Promise<IUserAuth> : null;
}

export const getUserAuthHeader = async (req: NextApiRequest):Promise<IUserAuth|object> => {
  const auth = await getUserAuth(req);
  return (auth) ? authHeader(auth) : {};
}

export const serviceAuth = async (username: string, password: string) => {
  const auth = await authorizeService(username, password);
  return IsIHTTPError(auth) ? {} : auth;
}