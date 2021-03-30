import { getServiceClient, gql, GQLEndpoint } from "@/modules/graphql";
import { GraphQLClient } from "graphql-request";
import {
  CaregiverFields,
  MidwifeFields,
  InstitutionFields,
  OrganisationFields,
  Profile,
} from "../types";

export async function getProfileList(
  lang: string,
  client?: GraphQLClient
): Promise<Profile[]> {
  const subquery = gql`
    query getProfiles($lang: String!, $includeSelf: Boolean){
      caregivers(lang: $lang) { ${CaregiverFields} }
      midwives(lang: $lang) { ${MidwifeFields} }
      organisations(lang: $lang) { ${OrganisationFields} }
      institutions(lang: $lang) { ${InstitutionFields} }
    }
  `;

  // gql endpoint should probably be user later, to respect
  if (!client) client = await getServiceClient(GQLEndpoint.Internal);

  if (!client)
    //HACKY find a way to report the error
    return [];

  const {
    caregivers,
    midwives,
    organisations,
    institutions,
  } = await client.request<{
    caregivers: Profile[];
    midwives: Profile[];
    organisations: Profile[];
    institutions: Profile[];
  }>(subquery, {
    lang,
  });

  const profiles: Profile[] = caregivers
    .concat(midwives)
    .concat(organisations)
    .concat(institutions)
    .sort((a, b) =>
      a.surname.localeCompare(b.surname, lang, { ignorePunctuation: true })
    );

  return profiles;
}
