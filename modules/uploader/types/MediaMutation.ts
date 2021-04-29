import { ErrorMap } from "@/modules/model";
import { gql } from "@/modules/graphql";
import { MutationResponseFields } from "@/modules/model/IMutationResponse";

export interface IMediaMutationResult {
  success: boolean;
  errors: ErrorMap;
  route: string;
}

export const insertMediaMutation = gql`
mutation insertMedia($input: [MediaInput!]!, $lang: String) {
  insertMedia(input: $input, lang: $lang) {
    ${MutationResponseFields}
    route
  }
}
`;
