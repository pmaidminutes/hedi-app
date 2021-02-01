import {
  initiateSSO,
  requestSSOAuthCode,
  requestSSOLoginToken,
} from "./requests";

export async function querySSOLoginToken(
  cmsUserSession: string
): Promise<string> {
  const initResponse = await initiateSSO();
  const authCodeRedirectURL = await requestSSOAuthCode(
    initResponse.url,
    cmsUserSession
  );
  return requestSSOLoginToken(authCodeRedirectURL, initResponse.cookie);
}
