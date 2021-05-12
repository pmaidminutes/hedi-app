import { gql, serviceGQuery } from "@/modules/graphql";
import { AppPageGQL, IAppPage } from "@/modules/common/types";
import { ILandingPageView } from "../../types/ILandingPageView";
import { EntityFields } from "@/modules/model";
import { logAndFallback, logAndNull } from "@/modules/common/error";
import { WithKeyFields } from "@/modules/model/IWithKey";
import { getLangByRoute } from "@/modules/common/utils";

export async function getLandingPageView(
  route: string
): Promise<ILandingPageView | null> {
  // TODO log the route to know possible paths with no content

  const lang = getLangByRoute(route) ?? "de";

  const query = gql`
    query getLandingPageView(
      $lang: String!     
      $includeSelf: Boolean
    ) { 
      appPages: appPagesByKey(keys: ["landingPage"], lang: $lang) {
        ${AppPageGQL} 
      }
    }`;
  const appPage = await serviceGQuery<{ appPages: IAppPage[] }>(query, {
    lang,
  }).then(data => logAndNull(data)?.appPages?.[0] ?? null);

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
        ${WithKeyFields}
        ${EntityFields}
        longTitle
      }
      linksIfLoggedIn: appPagesByKey(keys: ["editProfile"], lang: $lang) {
        ${WithKeyFields}
        ${EntityFields}
        longTitle
      }
    }
  `;
  const subResults = await serviceGQuery<
    Pick<ILandingPageView, "links" | "linksIfLoggedIn">
  >(subquery, {
    lang,
  }).then(data =>
    logAndFallback(data, { links: [], linksIfLoggedIn: [] } as Pick<
      ILandingPageView,
      "links" | "linksIfLoggedIn"
    >)
  );
  return { ...appPage, ...subResults };
}
