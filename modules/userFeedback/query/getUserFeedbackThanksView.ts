import { getServiceClient, gql, GQLEndpoint } from "@/modules/graphql";
import { getLangByRoute } from "@/modules/common/utils";
import { AppPagesGQL } from "@/modules/common/query";
import { IAppPage } from "@/modules/common/types";

export async function getUserFeedbackThanksView(
  route: string
): Promise<IAppPage | null> {
  const lang = getLangByRoute(route);

  const query = gql`
    query getUserFeedbackThanksView(
      $routes: [String!]!
      $lang: String!
      $includeSelf: Boolean
    ) {
      ${AppPagesGQL}
    }
  `;
  const client = await getServiceClient(GQLEndpoint.Internal);
  return client
    .request<{ appPages: IAppPage[] }>(query, {
      routes: [route],
      lang,
    })
    .then(data => {
      const view = data.appPages?.[0];
      if (view && view.key === "userfeedbackThanks") {
        view.type = "UserFeedbackThanks";
        return view;
      }
      return null;
    })
    .catch(e => {
      console.warn(e);
      return null;
    });
}
