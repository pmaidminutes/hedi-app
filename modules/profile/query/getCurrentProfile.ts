import {
  getClient,
  getServiceClient,
  gql,
  GQLEndpoint,
} from "@/modules/graphql";
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
import { IUIElementTexts, WithUIElementsFields } from "@/modules/model";
import { IAppPage } from "@/modules/common/types";
import { IAuthHeader } from "@/modules/auth/types";

export type Profile = ICaregiver | IMidwife | IOrganisation | IInstitution;
export type ProfileView = Profile & {
  elements: IUIElementTexts[];
};
export async function getCurrentProfile(
  lang: string,
  authHeader: IAuthHeader
): Promise<ProfileView | null> {
  const query = gql`
    query getCurrentProfile(
      $lang: String!
      $includeSelf: Boolean
    ) {
      profile: currentProfile (lang: $lang) {
        ...on Caregiver {${CaregiverFields}}
        ...on Midwife {${MidwifeFields}}
        ...on Institution {${InstitutionFields}}
        ...on Organisation {${OrganisationFields}}
      }
    }
  `;

  const client = await getClient(GQLEndpoint.User, authHeader);
  const { profile } = await client
    .request<{ profile: Profile }>(query, { lang })
    .catch(e => {
      console.warn(e);
      return { profile: null };
    });
  if (!profile) return null;

  const internalClient = await getServiceClient(GQLEndpoint.Internal);
  const subquery = gql`
    query getCurrentProfileElements($lang: String!){
      uiTexts: appPagesByKey(keys:["viewprofile"], lang:$lang){
        ${WithUIElementsFields}
      }
    }
  `;

  const { uiTexts } = await internalClient.request<{ uiTexts: IAppPage[] }>(
    subquery,
    {
      lang,
    }
  );

  return { ...profile, elements: uiTexts[0].elements };
}
