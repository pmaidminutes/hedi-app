import { gql } from "@/modules/graphql";
import { EntityLocalizedFields } from "@/modules/model";

export const CategoryPathsGQL = gql`categories(lang: $lang) { ${EntityLocalizedFields} }`;
