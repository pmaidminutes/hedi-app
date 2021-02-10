import { NextApiHandler } from "next";
import { querySSOLoginToken } from "@/modules/messaging";
import { getUserAuthHeader } from "@/modules/auth/server";
import { getClient, GQLEndpoint } from "@/modules/graphql";

const tokenHandler: NextApiHandler<any> = async (req, res) => {
  const authHeader = await getUserAuthHeader(req);

  if (authHeader) {
    const gql = getClient(GQLEndpoint.User, authHeader);
    const sessionResponse = await gql.rawRequest<{ msgSession: string }>(
      `query MSGSession { msgSession }`
    );
    if (sessionResponse.data) {
      const tokenResponse = await querySSOLoginToken(
        sessionResponse.data.msgSession
      );
      res.status(200).send(tokenResponse);
    } else {
      res.status(sessionResponse.status).json(sessionResponse.errors);
    }
  } else {
    res.status(401).send("Not Authenticated");
  }
};

export default tokenHandler;
