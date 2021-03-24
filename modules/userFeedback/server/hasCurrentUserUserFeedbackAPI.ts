import { getUserAuthHeader } from "@/modules/auth/server";
import { NextApiHandler } from "next";
import { hasCurrentUserUserFeedback } from "../query/hasCurrentUserUserFeedback";

export const hasCurrentUserUserFeedbackAPI: NextApiHandler<
  boolean | null
> = async (req, res) => {
  const authHeader = await getUserAuthHeader(req);
  if (!authHeader) {
    res.status(401).json(null);
    return;
  }

  const hasUserFeedback = await hasCurrentUserUserFeedback(authHeader);
  if (hasUserFeedback != null) res.status(200).json(hasUserFeedback);
  else res.status(500).json(null);
};
