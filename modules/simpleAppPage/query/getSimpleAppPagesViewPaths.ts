import { generateAppPagePathsGQL } from "@/modules/common/query";
import { simpleAppPages } from "../types/SimpleAppPages";

export const SimpleAppPagesViewPathsGQL = generateAppPagePathsGQL(
  simpleAppPages
);
