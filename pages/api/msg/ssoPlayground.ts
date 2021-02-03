import { NextApiHandler } from "next";
import { querySSOLoginToken, requestLogin } from "@/modules/messaging";
import { getUserAuthHeader } from "@/modules/auth/server";
import { getClient, GQLEndpoint } from "@/modules/graphql";

const ssoPlaygroundHandler: NextApiHandler<any> = async (req, res) => {
  const authHeader = await getUserAuthHeader(req);

  if (authHeader) {
    const gql = getClient(GQLEndpoint.User, authHeader);
    const usr = await gql.request(`query MSGSession { msgSession }`);
    const session = usr.session;

    const tokenResponse = await querySSOLoginToken(session);

    const loginResponse = await requestLogin(tokenResponse);
    res.send(loginResponse);
  }
};

export default ssoPlaygroundHandler;
