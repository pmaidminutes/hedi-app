import { NextApiHandler } from "next";
import { getUserAuthHeader } from "@/modules/auth/server";
import {
  sendAPIErrorIfEmptyOrUnauthorized,
  sendAPIResult,
} from "@/modules/common/utils";
import { IMutationResponse } from "@/modules/model/IMutationResponse";
import { insertFeedbacks } from "./query";
import { FeedbackInput, FeedbackType } from "../types";

interface FeedbacksFetch {
  type: FeedbackType;
  texts: string[];
}

export const sendFeedbacksAPI: NextApiHandler<IMutationResponse> = async (
  req,
  res
) => {
  const authHeader = await getUserAuthHeader(req);
  const { isErrorSent } = await sendAPIErrorIfEmptyOrUnauthorized(
    req,
    res,
    authHeader
  );
  if (isErrorSent || !authHeader) return;

  const { type, texts } = JSON.parse(req.body) as FeedbacksFetch;
  const mutationResult = await insertFeedbacks(authHeader, type, texts);
  sendAPIResult(res, mutationResult);
};
