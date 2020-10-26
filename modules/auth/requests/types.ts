export interface ITokenResponse {
  access_token: string
  token_type: string
  expires_in: number
  refresh_token: string
  scope?: string
}

export interface IUserInfoResponse {
  sub: number
  name: string
  email: string
}

// TODO discuss a common interface for all modules and refactor
export interface IHTTPError {
  code: number
  text: string
}

export function IsIHTTPError(arg: any): arg is IHTTPError  {
  return ('code' in arg) && ('text' in arg);
}