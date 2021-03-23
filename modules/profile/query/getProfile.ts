import { getServiceClient, gql, GQLEndpoint } from "@/modules/graphql";
import {
  CaregiverFields,
  ICaregiver,
  MidwifeFields,
  IMidwife,
  IOrganisation,
  IInstitution,
  InstitutionFields,
  OrganisationFields,
} from "../types";
import { getLangByRoute } from "@/modules/common/utils";
import { IUIElementTexts, WithUIElementsFields } from "@/modules/model";
import { IAppPage } from "@/modules/common/types";

export type Profile = ICaregiver | IMidwife | IOrganisation | IInstitution;
export type ProfileView = Profile & {
  elements: IUIElementTexts[];
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

  return { ...profile, elements: uiTexts[0].elements };
}
