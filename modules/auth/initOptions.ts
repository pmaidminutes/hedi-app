import { InitOptions, User } from "next-auth";
import { IUserAuth } from "./flow";
import { credentialProvider } from "./providers";

export function getOptions(debug?: boolean): InitOptions {
  return {
    debug,
    providers: [credentialProvider],
    session: { jwt: true },
    jwt: { secret: process.env.NEXTAUTH_JWT_SECRET },
    callbacks: {
      jwt: async (
        token,
        user: User | IUserAuth,
        account,
        profile,
        isNewUser
      ) => {
        if (account?.type) {
          // account empty if call was not preceded by a login
          if (account.type === "credentials") {
            const auth = user as IUserAuth;
            token = { ...token, ...user };
          } else {
            token.accessToken = account.accessToken;
            token.refreshToken = account.refreshToken;
            token.accessTokenExpires = account.accessTokenExpires; //accessTokenExpires is not parsed correctly
          }
        }

        return token;
      },
    },
  };
}
