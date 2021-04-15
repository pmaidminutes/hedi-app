import { gql, userGQuery } from "@/modules/graphql";
import {
  CaregiverFields,
  MidwifeFields,
  InstitutionFields,
  OrganisationFields,
  Profile,
} from "../types";
import { IAuthHeader } from "@/modules/auth/types";
import { logAndFallback } from "@/modules/common/error";

export async function getCurrentProfile(
  lang: string,
  authHeader: IAuthHeader
): Promise<Profile | null> {
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

  const { profile } = await userGQuery<{ profile: Profile | {} }>(
    authHeader,
    query,
    { lang }
  ).then(data => logAndFallback(data, { profile: {} }));

  if (!profile || Object.keys(profile).length === 0) return null; // {} case is, profile available but not of any of the queried types

  return profile as Profile;
}
