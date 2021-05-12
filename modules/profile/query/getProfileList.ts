import { logAndFallback } from "@/modules/common/error";
import { gql, serviceGQuery } from "@/modules/graphql";
import { GraphQLClient } from "graphql-request";
import { CaregiverGQL, MidwifeFields, Profile } from "../types";

export async function getProfileList(
  lang: string,
  client?: GraphQLClient
): Promise<Profile[]> {
  const query = gql`
    query getProfiles($lang: String!, $includeSelf: Boolean){
      caregivers(lang: $lang) { ${CaregiverGQL} }
      midwives(lang: $lang) { ${MidwifeFields} }
    }
  `;

  // gql endpoint should probably be user later, to respect
  // if (!client) client = await getServiceClient(GQLEndpoint.Internal);

  type subqueryType = {
    caregivers: Profile[];
    midwives: Profile[];
  };
  const { caregivers, midwives } = await serviceGQuery<subqueryType>(query, {
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
    .sort((a, b) =>
      a.surname.localeCompare(b.surname, lang, { ignorePunctuation: true })
    );

  return profiles;
}
