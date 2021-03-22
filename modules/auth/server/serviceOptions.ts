import { NextAuthOptions } from "next-auth";
import { credentialProvider } from "./providers";
import { jwt } from "../query/jwtCallback";

export function getOptions(debug?: boolean): NextAuthOptions {
  return {
    debug,
    providers: [credentialProvider],
    session: { jwt: true },
    jwt: { secret: process.env.NEXTAUTH_JWT_SECRET },
    callbacks: {
      jwt,
    },
  };
}
