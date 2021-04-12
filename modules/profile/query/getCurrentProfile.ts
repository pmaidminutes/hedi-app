import { gql, userGQuery, serviceGQuery } from "@/modules/graphql";
import {
  CaregiverFields,
  MidwifeFields,
  InstitutionFields,
  OrganisationFields,
  Profile,
} from "../types";
import { EntityFields, WithUIElementsFields } from "@/modules/model";
import { IAppPage } from "@/modules/common/types";
import { IAuthHeader } from "@/modules/auth/types";
import { ProfileView } from "./getProfile";
import { getUIElementValue } from "@/modules/common/utils";
import { IsIHTTPError, logAndFallback } from "@/modules/common/error";

export async function getCurrentProfile(
  lang: string,
  authHeader: IAuthHeader
): Promise<ProfileView | null> {
  const query = gql`
    query getCurrentProfile(
      $lang: String!
      $includeSelf: Boolean
    ) {
      profile: currentProfile (lang: $lang) {
        ...on Caregiver {${CaregiverFields}}
        ...on Midwife {${MidwifeFields}}
        ...on Institution {${InstitutionFields}}
        ...on Organisation {${OrganisationFields}}
      }
    }
  `;

  const { profile } = await userGQuery<{ profile: Profile | {} }>(
    authHeader,
    query,
    { lang }
  ).then(data => logAndFallback(data, { profile: {} }));

  if (!profile || Object.keys(profile).length === 0) return null; // {} case is, profile available but not of any of the queried types

  const subquery = gql`
    query getCurrentProfileElements($lang: String!){
      uiTexts: appPagesByKey(keys:["viewprofile"], lang:$lang){
        ${WithUIElementsFields}
      }
    }
  `;

  const { uiTexts } = await serviceGQuery<{ uiTexts: IAppPage[] }>(subquery, {
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
        key
        ${EntityFields}
      }
    }
  `;
  const linkResults = await serviceGQuery<Pick<ProfileView, "links">>(
    queryForLinks,
    {
      lang,
      keys,
    }
  ).then(data =>
    logAndFallback(data, { links: [] } as Pick<ProfileView, "links">)
  );
  return { ...(profile as Profile), elements: uiTextElements, ...linkResults };
}
