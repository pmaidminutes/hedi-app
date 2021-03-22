import { getServiceClient, gql, GQLEndpoint } from "@/modules/graphql";
import { getLangByRoute } from "@/modules/common/utils";
import { AppPagesGQL } from "@/modules/common/query";
import { AppPageFields, IAppPage } from "@/modules/common/types";
import { ILandingPageView } from "../types/ILandingPageView";

export async function getLandingPageView(
  route: string
): Promise<ILandingPageView | null> {
  const lang = getLangByRoute(route);
  // TODO log the route to know possible paths with no content
  route = `/${lang}/landing-page`;

  const query = gql`
    query getLandingPageView(
      $routes: [String!]!
      $lang: String!
      $includeSelf: Boolean
    ) {
      ${AppPagesGQL}
    }
  `;
  const client = await getServiceClient(GQLEndpoint.Internal);
  const appPage = await client
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

  if (!(appPage && appPage.key === "landing-page")) return null;

  appPage.type = "LandingPage";
  appPage.translations.forEach(translation => {
    translation.route = "/" + translation.lang;
  });
  appPage.route = "/" + lang; // TODO should I write this line too?

  const subquery = gql`
    query getLandingPageButtons(
      $lang: String!
      $includeSelf: Boolean
    ) {
      buttons: appPagesByKey(keys: ["registration","login"], lang: $lang) {
        ${AppPageFields}
      }
    }
  `;
  const subResults = await client.request<Pick<ILandingPageView, "buttons">>(
    subquery,
    {
      lang,
    }
  );

  console.log(appPage);
  console.log(subResults);

  return { ...appPage, ...subResults };
}
