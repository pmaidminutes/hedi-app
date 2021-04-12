import { gql, serviceGQuery } from "@/modules/graphql";
import { getLangByRoute, getUIElementValue } from "@/modules/common/utils";
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
import { logAndFallback, logAndNull } from "@/modules/common/error";

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
  const appPage = await serviceGQuery<{ appPages: IAppPage[] }>(query, {
    routes: [route],
    lang,
  }).then(data => logAndNull(data)?.appPages?.[0]);

  if (!(appPage && appPage.key === "editprofile")) return null;

  appPage.type = "EditProfile";
  const keys = [getUIElementValue("redirect", appPage.elements)];
  const subquery = gql`
    query getEditProfileChildren(
      $lang: String!
      $keys:[String!]!
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
      links: appPagesByKey(keys: $keys, lang: $lang) {
        key
        ${EntityFields}
      }
    }
  `;

  type subqueryType = {
    subPages: IAppPage[];
    domainOptions: IEntity[];
    languageOptions: ILanguage[];
    serviceGroups: IServiceGroup[];
    languageLevels: { elements: IUIElementTexts[] }[];
    links: (IEntity & { key: string })[];
  };

  const {
    subPages,
    domainOptions,
    languageOptions,
    serviceGroups,
    languageLevels,
    links,
  } = await serviceGQuery<subqueryType>(subquery, {
    lang,
    keys,
  }).then(data =>
    logAndFallback(data, {
      subPages: [],
      domainOptions: [],
      languageOptions: [],
      serviceGroups: [],
      languageLevels: [],
      links: [],
    } as subqueryType)
  );

  const conditionalElements = subPages.reduce((acc, page) => {
    const key = page.key.replace("editprofile_", "") as ProfileType;
    acc[key] = page.elements;
    return acc;
  }, {} as Record<ProfileType, IUIElementTexts[]>);

  // TODO filter out services which are groups at the same time
  const Midwife = serviceGroups.filter(sg => sg.midwife);
  const Caregiver = serviceGroups.filter(sg => sg.caregiver);
  for (let i = 0; i < Midwife.length; i++) {
    Midwife[i] = { ...Midwife[i] }; // break up reference shared with caregiver
    Midwife[i].services = Midwife[i].services.filter(
      s => !Midwife.find(sg => sg.route === s.route)
    );
  }

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
    links,
  };
}
