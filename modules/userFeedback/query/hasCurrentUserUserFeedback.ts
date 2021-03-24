import { getClient, gql, GQLEndpoint } from "@/modules/graphql";

import { IAuthHeader } from "@/modules/auth/types";

export async function hasCurrentUserUserFeedback(
  authHeader: IAuthHeader
): Promise<boolean | null> {
  const query = gql`
    query currentUserUserFeedbacksQuery {
      currentUserUserFeedbacks {
        route
      }
    }
  `;

  const client = await getClient(GQLEndpoint.User, authHeader);
  const queryResult = await client
    .request<{ currentUserUserFeedbacks: { route: string }[] }>(query)
    .catch(e => {
      console.warn(e);
      return null;
    });
  if (!queryResult?.currentUserUserFeedbacks) return null;
  return queryResult.currentUserUserFeedbacks.length > 0;
}
