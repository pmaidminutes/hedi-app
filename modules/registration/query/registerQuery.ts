import { getServiceClient, gql } from "@/modules/graphql";
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
      $mail: String
      $pass: String
    ) {
      register(name: $name, mail: $mail, pass: $pass) {
        ${RegisterResponseFields}
      }
    }
  `;
  const client = await getServiceClient();
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
