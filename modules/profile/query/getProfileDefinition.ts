import { gql, serviceGQuery } from "@/modules/graphql";
import { getUIElementValue } from "@/modules/common/utils";
import { EntityFields, WithUIElementsFields } from "@/modules/model";
import { IAppPage } from "@/modules/common/types";
import { logAndFallback } from "@/modules/common/error";
import { IProfileDefinition } from "../types";
import { WithKeyFields } from "@/modules/model/IWithKey";

export async function getProfileDefinition(
  lang: string
): Promise<IProfileDefinition | null> {
  const query = gql`
    query getProfileElements($lang: String!){
      uiTexts: appPagesByKey(keys:["viewprofile"], lang:$lang){
        ${WithUIElementsFields}
      }
    }
  `;

  const { uiTexts } = await serviceGQuery<{ uiTexts: IAppPage[] }>(query, {
    lang,
  }).then(data => logAndFallback(data, { uiTexts: [] as IAppPage[] }));
  const uiTextElements = uiTexts[0].elements;
  const keys = [getUIElementValue("edit_redirect", uiTextElements)];
  const queryForLinks = gql`
    query getProfileEditLinks(
      $keys: [String!]!
      $lang: String!
    ) {
      links: appPagesByKey(keys: $keys, lang: $lang) {
        ${WithKeyFields}
        ${EntityFields}
      }
    }
  `;
  const linkResults = await serviceGQuery<Pick<IProfileDefinition, "links">>(
    queryForLinks,
    {
      lang,
      keys,
    }
  ).then(data =>
    logAndFallback(data, { links: [] } as Pick<IProfileDefinition, "links">)
  );
  return { elements: uiTexts[0].elements, ...linkResults };
}
