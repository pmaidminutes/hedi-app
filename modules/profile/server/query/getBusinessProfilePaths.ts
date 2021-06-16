import { gql } from "@/modules/graphql";
import { EntityLocalizedFields } from "@/modules/model";

export const BusinessProfilePathsGQL = gql`
  professionals(lang: $lang) { ${EntityLocalizedFields} }
  organisations(lang: $lang) { ${EntityLocalizedFields} }
`;
