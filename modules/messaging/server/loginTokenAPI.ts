import { NextApiHandler } from "next";
import { querySSOLoginToken } from "../query";
import { userGQuery } from "@/modules/graphql";
import { IsIHTTPError } from "@/modules/common/error";
import {
  sendAPIErrorIfUnauthorized,
  sendAPIHttpError,
  sendAPISuccess,
} from "@/modules/common/utils";

const loginTokenAPI: NextApiHandler<any> = async (req, res) => {
  const { isErrorSent, authHeader } = await sendAPIErrorIfUnauthorized(
    req,
    res
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
