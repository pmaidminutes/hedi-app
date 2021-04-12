import { IAuthHeader } from "@/modules/auth/types";
import { logAndNull } from "@/modules/common/error";
import { userGQuery } from "@/modules/graphql";
import { IMutationResponse } from "@/modules/model/IMutationResponse";
import { insertUserFeedbacksMutation, UserFeedbackInput } from "../types";

export async function insertUserFeedbacks(
  authHeader: IAuthHeader,
  userfeedbacks: UserFeedbackInput[],
  lang?: string
): Promise<IMutationResponse[] | null> {
  return userGQuery<{ insertUserFeedbacks: IMutationResponse[] }>(
    authHeader,
    insertUserFeedbacksMutation,
    {
      input: userfeedbacks,
      lang,
    }
  ).then(data => logAndNull(data)?.insertUserFeedbacks ?? null);
}
