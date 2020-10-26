import { expiryObject } from '../utils';
import { requestToken, requestUserInfo } from '../requests';
import { IUserAuth } from './types';
import { IHTTPError, IsIHTTPError, ITokenResponse } from '../requests/types';
export { IsIHTTPError } from '../requests/types';

export async function authorizeWithCredentials(username: string, password: string, csrfToken: string) {

  const response = await requestToken(username, password, csrfToken); 
  if (IsIHTTPError(response))
    return response as IHTTPError; 

  const tokenResp = response as ITokenResponse;
  
  const { iat, exp } = expiryObject(tokenResp.expires_in);

  const userInfoResp = await requestUserInfo(tokenResp.access_token, csrfToken);

  return {
    id: userInfoResp.name+'_'+userInfoResp.sub,
    name: userInfoResp.name, 
    email: userInfoResp.email,
    accessToken: tokenResp.access_token,
    iat,
    exp,
    refreshToken: tokenResp.refresh_token,
    csrfToken
  } as IUserAuth; 
}