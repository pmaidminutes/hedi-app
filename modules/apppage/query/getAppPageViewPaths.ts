import { generateAppPagePathsGQL } from "@/modules/common/query";
import { appPageKeys } from "../types/appPageKeys";

export const AppPageViewPathsGQL = generateAppPagePathsGQL(appPageKeys);
