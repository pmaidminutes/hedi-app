import { IProfile } from "@/modules/model/IProfile";

export type Location = Pick<IProfile, "displayName" | "lat" | "long">;
