import { getServiceClient, gql, GQLEndpoint } from "@/modules/graphql";
import {
  CaregiverFields,
  MidwifeFields,
  InstitutionFields,
  OrganisationFields,
  Profile,
  ProfileTypeNameArray,
} from "../types";
import { getLangByRoute, getUIElementValue } from "@/modules/common/utils";
import {
  EntityFields,
  IEntity,
  IUIElementTexts,
  WithUIElementsFields,
} from "@/modules/model";
import { IAppPage } from "@/modules/common/types";

export type ProfileView = Profile & {
  elements: IUIElementTexts[];
  links: (IEntity & { key: string })[];
};
export async function getProfile(route: string): Promise<ProfileView | null> {
  const lang = getLangByRoute(route);

  const query = gql`
    query getProfile(
      $routes: [String!]!
        $lang: String!
        $includeSelf: Boolean
    ) {
      profiles: entitiesTranslated (routes: $routes, lang: $lang) {
        ...on Caregiver {${CaregiverFields}}
        ...on Midwife {${MidwifeFields}}
        ...on Institution {${InstitutionFields}}
        ...on Organisation {${OrganisationFields}}
      }
    }
  `;

  const client = await getServiceClient(GQLEndpoint.Internal);
  const { profiles } = await client
    .request<{ profiles: Profile[] }>(query, { routes: [route], lang })
    .catch(e => {
      console.warn(e);
      return { profiles: [] };
    });
  if (!profiles?.[0]) return null;

  const profile = profiles[0];
  if (!ProfileTypeNameArray.includes(profile.type)) return null;

  const subquery = gql`
    query getProfileElements($lang: String!){
      uiTexts: appPagesByKey(keys:["viewprofile"], lang:$lang){
        ${WithUIElementsFields}
      }
    }
  `;

  const { uiTexts } = await client.request<{ uiTexts: IAppPage[] }>(subquery, {
    lang,
  });
  const uiTextElements = uiTexts[0].elements;
  const keys = [getUIElementValue("edit_redirect", uiTextElements)];
  const queryForLinks = gql`
    query getProfileEditLinks(
      $keys: [String!]!
      $lang: String!
    ) {
      links: appPagesByKey(keys: $keys, lang: $lang) {
        key
        ${EntityFields}
      }
    }
  `;
  const linkResults = await client.request<Pick<ProfileView, "links">>(
    queryForLinks,
    {
      lang,
      keys,
    }
  );
  return { ...profile, elements: uiTexts[0].elements, ...linkResults };
}
