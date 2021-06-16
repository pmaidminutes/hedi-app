import { logAndFallback } from "@/modules/common/error";
import { gql, serviceGQuery } from "@/modules/graphql";
import { GraphQLClient } from "graphql-request";
import {
  BusinessProfileFields,
  IBusinessProfile,
  IProfileEntry,
} from "../../types";
import { transformProfileToEntry } from "../../utils/transformProfileToEntry";

type BusinessProfilesResponse = {
  professionals: IBusinessProfile[];
  organisations: IBusinessProfile[];
};

export async function getProfileList(
  lang: string,
  client?: GraphQLClient
): Promise<IProfileEntry[]> {
  const query = gql`
    query getBusinessProfiles($lang: String!, $includeSelf: Boolean) {
      professionals(lang: $lang) { ${BusinessProfileFields} }
      organisations(lang: $lang) { ${BusinessProfileFields} }
    }
  `;

  // gql endpoint should probably be user later, to respect
  // if (!client) client = await getServiceClient(GQLEndpoint.Internal);

  const {
    professionals,
    organisations,
  } = await serviceGQuery<BusinessProfilesResponse>(query, {
    lang,
  }).then(data =>
    logAndFallback(data, {
      professionals: [],
      organisations: [],
    } as BusinessProfilesResponse)
  );

  const profiles = professionals
    .concat(organisations)
    .sort((a, b) =>
      a.label.localeCompare(b.label, lang, { ignorePunctuation: true })
    );
  return profiles.map(profile => transformProfileToEntry(profile));
}
