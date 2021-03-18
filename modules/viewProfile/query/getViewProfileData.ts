import { getLangByRoute } from "@/modules/common/utils";
import { getServiceClient, gql, GQLEndpoint } from "@/modules/graphql";
import { IProfile, ProfileFields } from "@/modules/model/IProfile";

export async function getViewProfileData(
  route: string
): Promise<IProfile | null> {
  const lang = getLangByRoute(route);
  console.log(route, "route here");
  console.log(lang, "lang here");
  const query = gql`
    query getViewProfileData(
      $lang: String!
      $includeSelf: Boolean
    ) {
      userById {${ProfileFields}}
    }
  `;
  const client = await getServiceClient(GQLEndpoint.Internal);
  const { profileArray } = await client
    .request<{ profileArray: IProfile[] }>(query, {
      lang,
    })
    .catch(e => {
      console.warn(e);
      return { profileArray: [] };
    });

  if (!profileArray?.[0]) return null;

  const profile = profileArray[0];

  return { ...profile };
}
