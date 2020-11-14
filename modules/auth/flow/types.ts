export interface IAuth {
  name: string
  accessToken: string
  iat: number
  exp: number
  refreshToken: string
  csrfToken: string
}

export interface IUserAuth extends IAuth {
  id: string
  email: string
}