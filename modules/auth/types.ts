export interface IAuth {
  name: string;
  accessToken: string;
  iat: number;
  exp: number;
  refreshToken: string;
  csrfToken: string;
}

export interface IUserAuth extends IAuth {
  id: string;
  email: string;
}

export interface IAuthHeader extends Record<string, string> {
  Authorization: string;
  "X-CSRF-Token": string;
}
