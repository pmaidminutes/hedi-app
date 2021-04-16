import {
  sendAPIErrorIfUnauthorized,
  sendAPIResult,
} from "@/modules/common/utils";
import { NextApiHandler } from "next";
import { hasCurrentUserUserFeedback } from "../query/hasCurrentUserUserFeedback";

export const hasCurrentUserUserFeedbackAPI: NextApiHandler<
  boolean | null
> = async (req, res) => {
  const { isErrorSent, authHeader } = await sendAPIErrorIfUnauthorized(
    req,
    res
  );
  if (isErrorSent || !authHeader) return;

  const hasUserFeedback = await hasCurrentUserUserFeedback(authHeader);
  sendAPIResult(res, hasUserFeedback);
};
