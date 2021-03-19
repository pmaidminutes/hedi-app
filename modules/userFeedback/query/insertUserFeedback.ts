import { IAuthHeader } from "@/modules/auth/types";
import { getClient, GQLEndpoint } from "@/modules/graphql";
import { IMutationResponse } from "@/modules/model/IMutationResponse";
import { insertUserFeedbacksMutation, UserFeedbackInput } from "../types";

export async function insertUserFeedbacks(
  authHeader: IAuthHeader,
  userfeedbacks: UserFeedbackInput[],
  lang?: string
): Promise<IMutationResponse[] | null> {
  const client = await getClient(GQLEndpoint.User, authHeader);
  return client
    .request<{ insertUserFeedbacks: IMutationResponse[] }>(
      insertUserFeedbacksMutation,
      {
        input: userfeedbacks,
        lang,
      }
    )
    .then(data => data.insertUserFeedbacks)
    .catch((err: any) => {
      console.warn(err);
      return null;
    });
}
