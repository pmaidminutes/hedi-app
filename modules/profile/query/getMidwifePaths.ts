import { gql } from "@/modules/graphql";
import { EntityLocalizedFields } from "@/modules/model";

export const MidwifePathsGQL = gql`midwives(lang: $lang) { ${EntityLocalizedFields} }`;
