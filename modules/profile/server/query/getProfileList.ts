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
  associations: IBusinessProfile[];
};

export async function getProfileList(
  lang: string,
  client?: GraphQLClient
): Promise<IProfileEntry[]> {
  const query = gql`
    query getBusinessProfiles($lang: String!, $includeSelf: Boolean) {
      professionals(lang: $lang) { ${BusinessProfileFields} }
      associations(lang: $lang) { ${BusinessProfileFields} }
    }
  `;

  // gql endpoint should probably be user later, to respect
  // if (!client) client = await getServiceClient(GQLEndpoint.Internal);

  const {
    professionals,
    associations,
  } = await serviceGQuery<BusinessProfilesResponse>(query, {
    lang,
  }).then(data =>
    logAndFallback(data, {
      professionals: [],
      associations: [],
    } as BusinessProfilesResponse)
  );

  const profiles = professionals
    .concat(associations)
    .sort((a, b) =>
      a.label.localeCompare(b.label, lang, { ignorePunctuation: true })
    );
  return profiles.map(profile => transformProfileToEntry(profile));
}
