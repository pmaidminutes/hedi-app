import { getServiceClient, gql, GQLEndpoint } from "@/modules/graphql";
import {
  IRegisterRequest,
  IRegisterResponse,
  RegisterResponseFields,
} from "../types";

export async function registerQuery(
  data: IRegisterRequest
): Promise<IRegisterResponse | null> {
  const mutation = gql`
    mutation register(
      $name: String
      $pass: String
      $lang: String
      $commit: Boolean
    ) {
      register(input:{name: $name, pass: $pass},lang:$lang, commit: $commit) {
        ${RegisterResponseFields}
      }
    }
  `;
  const client = await getServiceClient(GQLEndpoint.Internal);
  client.request;
  return client
    .request<{ register: IRegisterResponse; error?: any }>(mutation, data)
    .then(data => {
      return data.register;
    })
    .catch(e => {
      console.warn(e);
      return null;
    });
}
