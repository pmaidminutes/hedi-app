import { IUserInfoResponse } from "../../types";

export const authCodeProvider = {
  id: "hediauthcode",
  name: "HEDI",
  type: "oauth",
  version: "2.0",
  scope: "default profile email openid offline_access",
  params: { grant_type: "authorization_code" },
  accessTokenUrl: process.env.CMS_URL + "/oauth2/token",
  authorizationUrl:
    process.env.CMS_URL + "/oauth2/authorize?response_type=code",
  profileUrl: process.env.CMS_URL + "/oauth2/UserInfo",
  profile: (profile: IUserInfoResponse) => {
    return {
      id: profile.name + "_" + profile.sub,
      name: profile.name,
      email: profile.email,
    };
  },
  clientId: process.env.NEXTAUTH_CMS_ID,
  clientSecret: process.env.NEXTAUTH_CMS_SECRET,
};
