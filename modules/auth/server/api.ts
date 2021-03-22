import { NextApiResponse, NextApiRequest } from "next";
import NextAuth from "next-auth";
import { getToken } from "next-auth/jwt";
import { getOptions } from "./serviceOptions";
import { toAuthHeader } from "../query";
import { IAuthHeader, IUserAuth } from "../types";
import { IHTTPError, IsIHTTPError } from "@/modules/common/error";

export const withAuth = async (
  req: NextApiRequest,
  res: NextApiResponse,
  debug?: boolean
) => {
  return NextAuth(req, res, getOptions(debug));
};

export const getUserAuth = async (
  req: NextApiRequest
): Promise<IUserAuth | IHTTPError> => {
  const secret = process.env.NEXTAUTH_JWT_SECRET;
  if (!secret) return { code: 501, text: "Service Unavailable" };
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
