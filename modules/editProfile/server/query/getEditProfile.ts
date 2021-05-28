import { gql, serviceGQuery } from "@/modules/graphql";
import { getUIElementValue } from "@/modules/common/utils";
import { IAppPage } from "@/modules/common/types";
import { IEditProfileView } from "../../types";
import {
  EntityFields,
  IEntity,
  ILanguage,
  IServiceGroup,
  LanguageFields,
  ServiceGroupFields,
} from "@/modules/model";
import { logAndFallback } from "@/modules/common/error";

export async function getEditProfileDefinition(
  appPage: IAppPage
): Promise<Omit<IEditProfileView, keyof IAppPage>> {
  const keys = [getUIElementValue("redirect", appPage.elements)];
  const subquery = gql`
    query getEditProfileChildren(
      $lang: String!
      $keys:[String!]!
      $includeSelf: Boolean
    ) {
      languageOptions: allLanguages(lang: $lang) {
        ${LanguageFields}
      }
      serviceGroups(lang: $lang) {
        ${ServiceGroupFields}
      }
    }
  `;

  type subqueryType = {
    languageOptions: ILanguage[];
    serviceGroups: IServiceGroup[];
  };

  const { languageOptions, serviceGroups } = await serviceGQuery<subqueryType>(
    subquery,
    {
      lang: appPage.lang,
      keys,
    }
  ).then(data =>
    logAndFallback(data, {
      languageOptions: [],
      serviceGroups: [],
    } as subqueryType)
  );

  return {
    languageOptions,
    links: [],
  };
}
