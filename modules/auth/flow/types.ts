export interface IUserAuth {
  id: string
  name: string
  email: string
  accessToken: string
  iat: number
  exp: number
  refreshToken: string
  csrfToken: string
}