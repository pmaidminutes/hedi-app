import { getServiceClient, gql, GQLEndpoint } from "@/modules/graphql";
import { AppPageFields, IAppPage } from "@/modules/common/types";
import { ILandingPageView } from "../types/ILandingPageView";
import { EntityFields } from "@/modules/model";

export async function getLandingPageView(
  route: string,
  lang: string = "de"
): Promise<ILandingPageView | null> {
  // TODO log the route to know possible paths with no content
  const query = gql`
    query getLandingPageView(
      $lang: String!     
      $includeSelf: Boolean
    ) { 
      appPages: appPagesByKey(keys: ["landingPage"], lang: $lang) {
        ${AppPageFields} 
      }
    }`;
  const client = await getServiceClient(GQLEndpoint.Internal);
  const appPage = await client
    .request<{ appPages: IAppPage[] }>(query, {
      lang,
    })
    .then(data => {
      return data.appPages?.[0];
    })
    .catch(e => {
      console.warn(e);
      return null;
    });

  if (!(appPage && appPage.key === "landingPage")) return null;

  appPage.type = "LandingPage";
  appPage.translations.forEach(translation => {
    translation.route = "/" + translation.lang;
  });
  appPage.route = "/" + lang; // TODO should I write this line too?

  const subquery = gql`
    query getLandingPageUIElements(
      $lang: String!
    ) {
      links: appPagesByKey(keys: ["registration","login"], lang: $lang) {
        key
        ${EntityFields}
      }
      linksIfLoggedIn: appPagesByKey(keys: ["editProfile"], lang: $lang) {
        key
        ${EntityFields}
      }
    }
  `;
  const subResults = await client.request<
    Pick<ILandingPageView, "links" | "linksIfLoggedIn">
  >(subquery, {
    lang,
  });
  return { ...appPage, ...subResults };
}
