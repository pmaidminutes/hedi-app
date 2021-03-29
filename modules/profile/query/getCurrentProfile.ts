import {
  getClient,
  getServiceClient,
  gql,
  GQLEndpoint,
} from "@/modules/graphql";
import {
  CaregiverFields,
  MidwifeFields,
  InstitutionFields,
  OrganisationFields,
  Profile,
} from "../types";
import { WithUIElementsFields } from "@/modules/model";
import { IAppPage } from "@/modules/common/types";
import { IAuthHeader } from "@/modules/auth/types";
import { ProfileView } from "./getProfile";

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
    .request<{ profile: Profile | {} }>(query, { lang })
    .catch(e => {
      console.warn(e);
      return { profile: null };
    });

  if (!profile || Object.keys(profile).length === 0) return null; // {} case is, profile available but not of any of the queried types

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

  return { ...(profile as Profile), elements: uiTexts[0].elements };
}
