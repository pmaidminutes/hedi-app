import { expiryObject } from '../utils';
import { requestToken, IsIHTTPError } from '../requests';
import { IAuth } from './types';

export async function getAccess(username: string, password: string, csrfToken: string) {

  const response = await requestToken(username, password, csrfToken); 
  if (IsIHTTPError(response))
    return response; 

  const { iat, exp } = expiryObject(response.expires_in);

  return {
    name: username, 
    accessToken: response.access_token,
    iat,
    exp,
    refreshToken: response.refresh_token,
    csrfToken
  } as IAuth; 
}