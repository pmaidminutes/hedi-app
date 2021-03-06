import { IsIHTTPError } from "@/modules/common/error";
import Providers from "next-auth/providers";
import { authorizeWithCredentials } from "../oauth";

interface ICredentials {
  csrfToken: string;
  username: string;
  password: string;
}

// TODO: [auth] login language specific

export const credentialProvider = Providers.Credentials({
  name: "HEDI App",
  credentials: {
    username: { label: "Username", type: "text", placeholder: "hedi" },
    password: { label: "Password", type: "password" },
  },
  authorize: async (credentials: any) => {
    //input type is not typed correctly
    const { username, password, csrfToken } = credentials as ICredentials;

    if (username && password) {
      const response = await authorizeWithCredentials(
        username,
        password,
        csrfToken
      );
      if (IsIHTTPError(response)) {
        // Error or custom uri (as pure string) can be passed here
        return Promise.resolve(null);
      } else {
        return response;
      }
    } else return Promise.resolve(null);
  },
});
