import { gql } from "@/modules/graphql";
import { EntityLocalizedFields } from "@/modules/model";

export const ArticlePathsGQL = gql`articles(lang: $lang) { ${EntityLocalizedFields} }`;
