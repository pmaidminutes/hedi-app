import { logAndFallback } from "@/modules/common/error";
import { gql, serviceGQuery } from "@/modules/graphql";
import { GraphQLClient } from "graphql-request";
import {
  CaregiverFields,
  MidwifeFields,
  OrganisationFields,
  Profile,
} from "../types";

export async function getProfileList(
  lang: string,
  client?: GraphQLClient
): Promise<Profile[]> {
  const query = gql`
    query getProfiles($lang: String!, $includeSelf: Boolean){
      caregivers(lang: $lang) { ${CaregiverFields} }
      midwives(lang: $lang) { ${MidwifeFields} }
      organisations(lang: $lang) { ${OrganisationFields} }
    }
  `;

  // gql endpoint should probably be user later, to respect
  // if (!client) client = await getServiceClient(GQLEndpoint.Internal);

  type subqueryType = {
    caregivers: Profile[];
    midwives: Profile[];
    organisations: Profile[];
  };
  const {
    caregivers,
    midwives,
    organisations,
  } = await serviceGQuery<subqueryType>(query, {
    lang,
  }).then(data =>
    logAndFallback(data, {
      caregivers: [],
      midwives: [],
      organisations: [],
      institutions: [],
    } as subqueryType)
  );

  const profiles: Profile[] = caregivers
    .concat(midwives)
    .concat(organisations)
    .sort((a, b) =>
      a.surname.localeCompare(b.surname, lang, { ignorePunctuation: true })
    );

  return profiles;
}
