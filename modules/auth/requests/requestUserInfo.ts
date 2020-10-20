import { IUserInfoResponse } from './types';
import { authHeader } from '../utils';

export async function requestUserInfo(accessToken: string, csrfToken: string) {
  return fetch(
    process.env.NEXTAUTH_CMS_URL+'/oauth2/UserInfo',
    {
      method: 'GET',
      headers: authHeader({ accessToken, csrfToken })
    }
  ).then(res => res.json() as Promise<IUserInfoResponse>)
}