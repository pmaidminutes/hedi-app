import { NextApiHandler } from "next";
import { getUserAuthHeader } from "@/modules/auth/server";
import {
  sendAPIErrorIfUnauthorized,
  sendAPIResult,
} from "@/modules/common/utils";
import { hasCurrentUserUserFeedback } from "../query/hasCurrentUserUserFeedback";

export const hasCurrentUserUserFeedbackAPI: NextApiHandler<
  boolean | null
> = async (req, res) => {
  const authHeader = await getUserAuthHeader(req);
  const { isErrorSent } = await sendAPIErrorIfUnauthorized(
    req,
    res,
    authHeader
  );
  if (isErrorSent || !authHeader) return;

  const hasUserFeedback = await hasCurrentUserUserFeedback(authHeader);
  sendAPIResult(res, hasUserFeedback);
};
