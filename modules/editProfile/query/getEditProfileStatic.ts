import { getServiceClient, gql, GQLEndpoint } from "@/modules/graphql";
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
} from "@/modules/model";
import { ProfileType } from "@/modules/profile/types";

export async function getEditProfileStatic(
  lang: string
): Promise<IEditProfileView | null> {
  const query = gql`
    query getEditProfileStatic(
      $lang: String!
      $includeSelf: Boolean
    ) {
      appPages: appPagesByKey(keys: ["editprofile"], lang: $lang) { ${AppPageFields} }
    }
  `;
  const client = await getServiceClient(GQLEndpoint.Internal);
  const { appPages } = await client
    .request<{ appPages: IAppPage[] }>(query, { lang })
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
    }
  `;
  const {
    subPages,
    domainOptions,
    languageOptions,
    serviceGroups,
  } = await client.request<{
    subPages: IAppPage[];
    domainOptions: IEntity[];
    languageOptions: ILanguage[];
    serviceGroups: IServiceGroup[];
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
  };
}