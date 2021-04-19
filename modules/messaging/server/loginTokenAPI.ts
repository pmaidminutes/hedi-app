import { NextApiHandler } from "next";
import { querySSOLoginToken } from "../query";
import { userGQuery } from "@/modules/graphql";
import { getUserAuthHeader } from "@/modules/auth/server";
import { IsIHTTPError } from "@/modules/common/error";
import {
  sendAPIErrorIfUnauthorized,
  sendAPIHttpError,
  sendAPISuccess,
} from "@/modules/common/utils";

const loginTokenAPI: NextApiHandler<any> = async (req, res) => {
  const authHeader = await getUserAuthHeader(req);
  const { isErrorSent } = await sendAPIErrorIfUnauthorized(
    req,
    res,
    authHeader
  );
  if (isErrorSent || !authHeader) return;

  userGQuery<{ msgSession: string }>(
    authHeader,
    `query MSGSession { msgSession }`
  ).then(async data => {
    if (IsIHTTPError(data)) {
      sendAPIHttpError(res, data);
      return;
    } else {
      const tokenResponse = await querySSOLoginToken(data.msgSession);
      sendAPISuccess(res, tokenResponse);
      return;
    }
  });
};

export default loginTokenAPI;
