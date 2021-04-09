import { gql } from "@/modules/graphql";
import { EntityLocalizedFields } from "@/modules/model";

// UNUSED
export const OrganisationPathsGQL = gql`organisations(lang: $lang) { ${EntityLocalizedFields} }`;
