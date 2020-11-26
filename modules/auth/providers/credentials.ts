import { IsIHTTPError } from "@/common/errorHandling";
import Providers from "next-auth/providers";
import { authorizeWithCredentials } from "../flow";

interface ICredentials {
  csrfToken: string;
  username: string;
  password: string;
}

// TODO: [auth] login view component
// TODO: [auth] login as modal/subcomponent
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
        return Promise.reject(new Error(response.text));
      } else {
        return response;
      }
    } else return null;
  },
});
