import { IAuthHeader } from "@/modules/auth/types";
import { logAndNull } from "@/modules/common/error";
import { userGQuery } from "@/modules/graphql";
import { IMutationResponse } from "@/modules/model/IMutationResponse";
import { insertFeedbacksMutation, FeedbackInput } from "../../types";

export async function insertFeedbacks(
  authHeader: IAuthHeader,
  feedbacks: FeedbackInput[],
  lang?: string
): Promise<IMutationResponse[] | null> {
  return userGQuery<{ insertUserFeedbacks: IMutationResponse[] }>(
    authHeader,
    insertFeedbacksMutation,
    {
      input: feedbacks,
      lang,
    }
  ).then(data => logAndNull(data)?.insertUserFeedbacks ?? null);
}
