import { gql } from "@/modules/graphql";
import { EntityLocalizedFields } from "@/modules/model";
import { ImageGQL } from "../../types";

export const CategoryEntryGQL = gql`... on Category {
  ${EntityLocalizedFields}
  image { ${ImageGQL} }
  }`;
