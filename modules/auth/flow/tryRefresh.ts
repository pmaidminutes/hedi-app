import { expiryObject, oauthNow } from '../utils';
import { requestRefresh } from '../requests';
import { IUserAuth } from './types';

export async function tryRefresh(userAuth: IUserAuth) {
  if ( oauthNow() < (userAuth.exp - 30) )
    return userAuth;

  const { refreshToken, csrfToken } = userAuth;
  const tokenResp = await requestRefresh(refreshToken, csrfToken);
  if (!tokenResp.access_token)
    return null;
  
  const { iat, exp } = expiryObject(tokenResp.expires_in);
  
  return {
    ...userAuth,
    accessToken: tokenResp.access_token,
    refreshToken: tokenResp.refresh_token,
    iat,
    exp
  } as IUserAuth; 
}