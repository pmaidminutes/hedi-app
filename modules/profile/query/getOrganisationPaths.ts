import { gql } from "@/modules/graphql";
import { EntityLocalizedFields } from "@/modules/model";

export const OrganisationPathsGQL = gql`organisations(lang: $lang) { ${EntityLocalizedFields} }`;
