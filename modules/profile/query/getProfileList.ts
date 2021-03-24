import { getServiceClient, gql, GQLEndpoint } from "@/modules/graphql";
import {
  CaregiverFields,
  MidwifeFields,
  InstitutionFields,
  OrganisationFields,
  Profile,
} from "../types";
import { getLangByRoute } from "@/modules/common/utils";
import { IAppPage } from "@/modules/common/types";
import { AppPagesGQL } from "@/modules/common/query";

export type ProfileListView = IAppPage & {
  profiles: Profile[];
};

export async function getProfileList(
  route: string
): Promise<ProfileListView | null> {
  const lang = getLangByRoute(route);

  const query = gql`
    query getProfileListElements(
      $routes: [String!]!
      $lang: String!
      $includeSelf: Boolean
    ) {
      ${AppPagesGQL}
    }
  `;
  const client = await getServiceClient(GQLEndpoint.Internal);
  const { appPages } = await client
    .request<{ appPages: IAppPage[] }>(query, {
      routes: [route],
      lang,
    })
    .catch(e => {
      console.warn(e);
      return { appPages: [] };
    });

  if (!(appPages?.[0] && appPages[0].key === "profiles")) return null;

  const appPage = appPages[0];
  appPage.type = "ProfileList";

  const subquery = gql`
    query getProfiles($lang: String!, $includeSelf: Boolean){
      caregivers(lang: $lang) { ${CaregiverFields} }
      midwives(lang: $lang) { ${MidwifeFields} }
      organisations(lang: $lang) { ${OrganisationFields} }
      institutions(lang: $lang) { ${InstitutionFields} }
    }
  `;

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

  return { ...appPage, profiles };
}
