import { NextApiResponse, NextApiRequest } from "next";
import { NextAuthHandler, NextAuthOptions } from "next-auth";
import { credentialProvider } from "./providers";
import { jwt } from "./oauth/jwtCallback";

function getOptions(debug?: boolean): NextAuthOptions {
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

export const nextauthAPI = async (
  req: NextApiRequest,
  res: NextApiResponse,
  debug = true
) => {
  return NextAuthHandler(req, res, getOptions(debug));
};
