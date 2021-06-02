import { IAuthHeader } from "@/modules/auth/types";
import { logAndNull } from "@/modules/common/error";
import { userGQuery } from "@/modules/graphql";
import { IMutationResponse } from "@/modules/model/IMutationResponse";
import { insertFeedbacksMutation, FeedbackInput } from "../../types";

export async function insertFeedbacks(
  authHeader: IAuthHeader,
  type: string,
  texts: string[]
): Promise<IMutationResponse | null> {
  return userGQuery<{ insertFeedback: IMutationResponse }>(
    authHeader,
    insertFeedbacksMutation,
    {
      texts,
      type,
    }
  ).then(data => logAndNull(data)?.insertFeedback ?? null);
}
