import { expiryObject } from '../utils';
import { requestToken, requestUserInfo } from '../requests';
import { IUserAuth } from './types';

export async function authorizeWithCredentials(username: string, password: string, csrfToken: string) {
  const tokenResp = await requestToken(username, password, csrfToken);
  if (!tokenResp.access_token)
    return null;
  
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