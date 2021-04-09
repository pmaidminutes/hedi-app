import { getUserAuthHeader } from "@/modules/auth/server";
import { sendAPIResult } from "@/modules/common/utils";
import { IMutationResponse } from "@/modules/model/IMutationResponse";
import { NextApiHandler } from "next";
import { insertUserFeedbacks } from "../query";
import { UserFeedbackInput } from "../types";

interface UserFeedbacksFetch {
  lang: string;
  userfeedbacks: UserFeedbackInput[];
}

export const sendUserFeedbacksAPI: NextApiHandler<
  IMutationResponse[] | IMutationResponse
> = async (req, res) => {
  if (!req.body) {
    res
      .status(400)
      .json({ success: false, errors: { generic: "no entity to save" } }); // TODO: how to return error (raw / translated)
    return;
  }

  const { lang, userfeedbacks } = JSON.parse(req.body) as UserFeedbacksFetch;

  const authHeader = await getUserAuthHeader(req);
  if (!authHeader) {
    res
      .status(401)
      .json({ success: false, errors: { generic: "Unauthorized" } }); // TODO: error text / handling
    return;
  }

  const mutationResult = await insertUserFeedbacks(
    authHeader,
    userfeedbacks,
    lang
  );
  sendAPIResult(res, mutationResult);
};
