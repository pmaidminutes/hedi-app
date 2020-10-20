import { NextApiResponse, NextApiRequest } from "next";
import NextAuth from 'next-auth';
import { getToken } from 'next-auth/jwt';
import { IUserAuth } from './flow';
import { getOptions } from './initOptions';
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