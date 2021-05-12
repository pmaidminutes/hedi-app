import { gql } from "@/modules/graphql";
import { EntityLocalizedFields } from "@/modules/model";
import { AppPageGQL } from "../types/appPage";

export const generateAppPagePathsGQL = (keys: string[]): string =>
  `${keys.join("_")}: appPagesByKey(keys: ${JSON.stringify(
    keys
  )}, lang: $lang) { ${EntityLocalizedFields} }`;

export const AppPagesGQL = gql`appPages(routes: $routes, lang: $lang) { ${AppPageGQL} }`;
