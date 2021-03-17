import { getServiceClient, gql, GQLEndpoint } from "@/modules/graphql";
import { getLangByRoute } from "@/modules/common/utils";
import { AppPagesGQL } from "@/modules/common/query";
import { AppPageFields, IAppPage } from "@/modules/common/types";
import { IEditProfileView } from "../types";

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
  console.log({ appPages });
  if (!(appPages?.[0] && appPages[0].key === "editprofile")) return null;

  const appPage = appPages[0];
  appPage.type = "EditProfile";

  const subquery = gql`
    query getEditProfileChildren(
      $lang: String!
      $includeSelf: Boolean
    ) {
      appPagesByKey(keys: ["editprofile_Parent","editprofile_Caregiver","editprofile_Midwife"], lang: $lang) {
        ${AppPageFields}
      }
    }
  `;
  const sub = await client.request<{ appPagesByKey: IAppPage[] }>(subquery, {
    lang,
  });
  console.log({ sub });
  const { appPagesByKey: children } = sub;

  return { ...appPage, children };
}
