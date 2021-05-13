import { logAndNull } from "@/modules/common/error";
import { gql, serviceGQuery } from "@/modules/graphql";
import {
  IRegisterRequest,
  IRegisterResponse,
  RegisterResponseFields,
} from "../../types";

export async function registerQuery(
  registerData: IRegisterRequest
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
  registerData.lang = registerData.lang ?? "de";
  return serviceGQuery<{ register: IRegisterResponse; error?: any }>(
    mutation,
    registerData
  ).then(data => logAndNull(data)?.register ?? null);
}
