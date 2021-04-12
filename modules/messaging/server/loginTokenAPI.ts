import { NextApiHandler } from "next";
import { querySSOLoginToken } from "../query";
import { getUserAuthHeader } from "@/modules/auth/server";
import { userGQuery } from "@/modules/graphql";
import { IsIHTTPError } from "@/modules/common/error";

const loginTokenAPI: NextApiHandler<any> = async (req, res) => {
  const authHeader = await getUserAuthHeader(req);

  if (authHeader) {
    userGQuery<{ msgSession: string }>(
      authHeader,
      `query MSGSession { msgSession }`
    ).then(async data => {
      if (IsIHTTPError(data)) {
        if (data.errors) res.json(data.errors);
        if (data.message) res.statusMessage = data.message;
        res.status(data.status);
        return;
      } else {
        const tokenResponse = await querySSOLoginToken(data.msgSession);
        res.status(200).send(tokenResponse);
        return;
      }
    });
  } else {
    res.status(401).send("Not Authenticated");
  }
};

export default loginTokenAPI;
