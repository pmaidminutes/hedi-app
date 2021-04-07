import { gql } from "@/modules/graphql";
import { EntityLocalizedFields } from "@/modules/model";

// UNUSED
export const InstitutionPathsGQL = gql`institutions(lang: $lang) { ${EntityLocalizedFields} }`;
