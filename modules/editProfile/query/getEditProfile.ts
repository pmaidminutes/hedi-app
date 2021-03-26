import { getServiceClient, gql, GQLEndpoint } from "@/modules/graphql";
import { getLangByRoute } from "@/modules/common/utils";
import { AppPagesGQL } from "@/modules/common/query";
import { AppPageFields, IAppPage } from "@/modules/common/types";
import { IEditProfileView } from "../types";
import {
  EntityFields,
  IEntity,
  ILanguage,
  IServiceGroup,
  IUIElementTexts,
  LanguageFields,
  ServiceGroupFields,
  WithUIElementsFields,
} from "@/modules/model";
import { ProfileType } from "@/modules/profile/types";

export async function getEditProfile(
  route: string
): Promise<IEditProfileView | null> {
  const lang = getLangByRoute(route);

  const query = gql`
    query getEditProfile(
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

  if (!(appPages?.[0] && appPages[0].key === "editprofile")) return null;

  const appPage = appPages[0];
  appPage.type = "EditProfile";

  const subquery = gql`
    query getEditProfileChildren(
      $lang: String!
      $includeSelf: Boolean
    ) {
      subPages: appPagesByKey(keys: ["editprofile_Parent","editprofile_Caregiver","editprofile_Midwife"], lang: $lang) {
        ${AppPageFields}
      }
      domainOptions: domains(lang: $lang) {
        ${EntityFields}
      }
      languageOptions: allLanguages(lang: $lang) {
        ${LanguageFields}
      }
      serviceGroups(lang: $lang) {
        ${ServiceGroupFields}
      }
      languageLevels: appPagesByKey(keys: ["languageLevels"], lang: $lang) {
        ${WithUIElementsFields}
      }
    }
  `;
  const {
    subPages,
    domainOptions,
    languageOptions,
    serviceGroups,
    languageLevels,
  } = await client.request<{
    subPages: IAppPage[];
    domainOptions: IEntity[];
    languageOptions: ILanguage[];
    serviceGroups: IServiceGroup[];
    languageLevels: { elements: IUIElementTexts[] }[];
  }>(subquery, {
    lang,
  });

  const conditionalElements = subPages.reduce((acc, page) => {
    const key = page.key.replace("editprofile_", "") as ProfileType;
    acc[key] = page.elements;
    return acc;
  }, {} as Record<ProfileType, IUIElementTexts[]>);

  // TODO filter out services which are groups at the same time
  const Midwife = serviceGroups.filter(sg => sg.midwife);
  const Caregiver = serviceGroups.filter(sg => sg.caregiver);

  return {
    ...appPage,
    conditionalElements,
    languageOptions,
    domainOptions,
    conditionalServiceGroups: { Midwife, Caregiver },
    languageLevelElements:
      languageLevels[0]?.elements.filter(
        elm => !isNaN(parseInt(elm.identifier))
      ) || [],
  };
}
