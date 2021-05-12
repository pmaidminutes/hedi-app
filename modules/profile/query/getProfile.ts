import { gql, serviceGQuery } from "@/modules/graphql";
import {
  CaregiverFields,
  MidwifeFields,
  Profile,
  ProfileTypeNameArray,
} from "../types";
import { getLangByRoute } from "@/modules/common/utils";
import { logAndNull } from "@/modules/common/error";

export async function getProfile(route: string): Promise<Profile | null> {
  const lang = getLangByRoute(route);

  const query = gql`
    query getProfile(
      $routes: [String!]!
        $lang: String!
        $includeSelf: Boolean
    ) {
      profiles: entitiesTranslated (routes: $routes, lang: $lang) {
        ...on Caregiver {${CaregiverFields}}
        ...on Midwife {${MidwifeFields}}
      }
    }
  `;

  const profile = await serviceGQuery<{ profiles: Profile[] }>(query, {
    routes: [route],
    lang,
  }).then(data => logAndNull(data)?.profiles?.[0]);
  if (!profile || !ProfileTypeNameArray.includes(profile.type)) return null;

  return profile;
}
