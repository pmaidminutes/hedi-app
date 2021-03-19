import { AppPagesGQL } from "@/modules/common/query";
import { IAppPage } from "@/modules/common/types";
import { getLangByRoute } from "@/modules/common/utils";
import { getServiceClient, gql, GQLEndpoint } from "@/modules/graphql";

export async function getRegistrationView(
  route: string
): Promise<IAppPage | null> {
  const lang = getLangByRoute(route);

  const query = gql`
    query getRegistrationView(
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
      console.log(view, "view");
      if (view && view.key === "registration") {
        view.type = "Registration";
        return view;
      }
      return null;
    })
    .catch(e => {
      console.warn(e);
      return null;
    });
}
