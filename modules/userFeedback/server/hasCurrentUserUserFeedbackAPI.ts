import { getUserAuthHeader } from "@/modules/auth/server";
import { sendAPIResult } from "@/modules/common/utils";
import { NextApiHandler } from "next";
import { hasCurrentUserUserFeedback } from "../query/hasCurrentUserUserFeedback";

export const hasCurrentUserUserFeedbackAPI: NextApiHandler<
  boolean | null
> = async (req, res) => {
  const authHeader = await getUserAuthHeader(req);
  if (!authHeader) {
    res.status(401).send(null);
    return;
  }

  const hasUserFeedback = await hasCurrentUserUserFeedback(authHeader);
  sendAPIResult(res, hasUserFeedback);
};
