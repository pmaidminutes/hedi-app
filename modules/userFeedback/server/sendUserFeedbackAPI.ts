import { NextApiHandler } from "next";
import { getUserAuthHeader } from "@/modules/auth/server";
import {
  sendAPIErrorIfEmptyOrUnauthorized,
  sendAPIResult,
} from "@/modules/common/utils";
import { IMutationResponse } from "@/modules/model/IMutationResponse";
import { insertUserFeedbacks } from "../query";
import { UserFeedbackInput } from "../types";

interface UserFeedbacksFetch {
  lang: string;
  userfeedbacks: UserFeedbackInput[];
}

export const sendUserFeedbacksAPI: NextApiHandler<
  IMutationResponse[] | IMutationResponse
> = async (req, res) => {
  const authHeader = await getUserAuthHeader(req);
  const { isErrorSent } = await sendAPIErrorIfEmptyOrUnauthorized(
    req,
    res,
    authHeader
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
