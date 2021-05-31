import { IPageConfig } from "@/modules/shell/types";
import { IProfile } from "./IProfile";
import { IPage } from "@/modules/page/types";

export type ProfileView = Partial<IPage> & IProfile & IPageConfig;
