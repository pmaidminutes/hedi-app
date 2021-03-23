import { generateAppPagePathsGQL } from "@/modules/common/query";
import { simpleAppPageKeys } from "../types/SimpleAppPageKeys";

export const SimpleAppPagesViewPathsGQL = generateAppPagePathsGQL(
  simpleAppPageKeys
);
