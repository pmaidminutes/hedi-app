import { gql } from "@/modules/graphql";
import { EntityLocalizedFields } from "@/modules/model";

export const PagePathsGQL = gql`pages(lang: $lang) { ${EntityLocalizedFields} }`;
