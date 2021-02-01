import { IProfile } from "@/modules/model/IProfile";

export type Location = Pick<IProfile, "display" | "lat" | "long">;
