import { getServiceClient, gql, GQLEndpoint } from "@/modules/graphql";
import { CaregiverFields, ICaregiver, ICaregiverView } from "../types";
import { getLangByRoute } from "@/modules/common/utils";
import { WithUIElementsFields } from "@/modules/model";
import {AppPageFields} from '@/modules/common/types'

export async function getCaregiver(
  route: string
): Promise<ICaregiverView | null> {
  const lang = getLangByRoute(route);

  const query = gql`
    query getCaregiver(
      $routes: [String!]
        $lang: String!
        $includeSelf: Boolean
    ) {
      caregivers(routes: $routes, lang: $lang) {
        ${CaregiverFields}
      }
    }
  `;

  const client = await getServiceClient(GQLEndpoint.Internal);
  const { caregivers } = await client
    .request<{ caregivers: ICaregiver[] }>(query, { routes: [route], lang })
    // .then(data => data.caregivers[0])
    .catch(e => {
      console.warn(e);
      return { caregivers: [] };
    });
  if (!caregivers?.[0]) return null;

  const caregiver = caregivers[0];

  const subquery = gql`
    query getCaregiverElements($lang: String!){
      uiTexts: appPagesByKey(keys:["viewprofile"], lang:$lang){
        ${WithUIElementsFields}
      }
    }
  `;

  const uiTexts = await client.request<Pick<ICaregiverView, "uiTexts">>(
    subquery,
    { lang }
  );

  console.log({uiTexts})

  return { ...caregiver, ...uiTexts };
}
