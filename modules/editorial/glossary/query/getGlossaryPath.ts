import { gql } from "@/modules/graphql";
import { EntityLocalizedFields } from "@/modules/model";

export const GlossaryPathsGQL = gql`glossary(lang: $lang) { ${EntityLocalizedFields} }`;
