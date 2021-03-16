import { IAuthHeader } from "@/modules/auth/types";
import { getClient, GQLEndpoint } from "@/modules/graphql";
import { IMutationResponse } from "@/modules/model/IMutationResponse";
import { insertUserFeedbackMutation, UserFeedbackInput } from "../types";

export async function insertUserFeedback(
  authHeader: IAuthHeader,
  userfeedback: UserFeedbackInput,
  lang?: string
): Promise<IMutationResponse | null> {
  const client = await getClient(GQLEndpoint.User, authHeader);
  return client
    .request<{ insertUserFeedback: IMutationResponse }>(
      insertUserFeedbackMutation,
      {
        input: userfeedback,
        lang,
      }
    )
    .then(data => data.insertUserFeedback)
    .catch((err: any) => {
      console.warn(err);
      return null;
    });
}
