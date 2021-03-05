import { gql } from "@/modules/graphql";
import { EntityLocalizedFields } from "@/modules/model";

export const SearchViewPathsGQL = gql` uitextsByKey(keys: ["search"], lang: $lang) { ${EntityLocalizedFields} }`;
