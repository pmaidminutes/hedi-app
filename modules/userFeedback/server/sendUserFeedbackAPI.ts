import {
  sendAPIErrorIfEmptyOrUnauthorised,
  sendAPIResult,
} from "@/modules/common/utils";
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
  const { isErrorSent, authHeader } = await sendAPIErrorIfEmptyOrUnauthorised(
    req,
    res
  );
  if (isErrorSent || !authHeader) return;

  const { lang, userfeedbacks } = JSON.parse(req.body) as UserFeedbacksFetch;
  const mutationResult = await insertUserFeedbacks(
    authHeader,
    userfeedbacks,
    lang
  );
  sendAPIResult(res, mutationResult);
};
