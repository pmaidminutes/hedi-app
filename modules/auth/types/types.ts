import { JWT } from "next-auth/jwt";
import { WithAdditionalParams } from "next-auth/_utils";

export interface IAuth {
  accessToken: string;
  accessTokenExpires: number;
  expires: number;
  iat: number;
  exp: number;
  refreshToken: string;
  csrfToken: string;
}

export interface IUserAuth extends IAuth, WithAdditionalParams<JWT> {
  id: string;
  name: string;
  email: string;
}

export interface IAuthHeader extends Record<string, string> {
  Authorization: string;
  "X-CSRF-Token": string;
}

export interface IUserInfoResponse {
  sub: number;
  name: string;
  email: string;
}
