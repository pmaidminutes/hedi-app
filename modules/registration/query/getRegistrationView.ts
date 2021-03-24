import { AppPagesGQL } from "@/modules/common/query";
import { IAppPage } from "@/modules/common/types";
import { getLangByRoute } from "@/modules/common/utils";
import { getServiceClient, gql, GQLEndpoint } from "@/modules/graphql";
import { EntityFields } from "@/modules/model";
import { IRegistrationView } from "../types";

export async function getRegistrationView(
  route: string
): Promise<IRegistrationView | null> {
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
  const view = await client
    .request<{ appPages: IAppPage[] }>(query, {
      routes: [route],
      lang,
    })
    .then(data => {
      return data.appPages?.[0];
    })
    .catch(e => {
      console.warn(e);
      return null;
    });
  if (!(view && view.key === "registration")) {
    return null;
  }
  const subquery = gql`
    query getLoginViewOtherLinks(
      $lang: String!
    ) {
      links: appPages(lang: $lang) {
        key
        ${EntityFields}
      }
    }
  `;
  const subResults = await client.request<Pick<IRegistrationView, "links">>(
    subquery,
    {
      lang,
    }
  );
  view.type = "Registration";
  return { ...view, ...subResults };
}
