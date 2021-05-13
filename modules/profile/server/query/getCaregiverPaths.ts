import { gql } from "@/modules/graphql";
import { EntityLocalizedFields } from "@/modules/model";

export const CaregiverPathsGQL = gql`caregivers(lang: $lang) { ${EntityLocalizedFields} }`;
