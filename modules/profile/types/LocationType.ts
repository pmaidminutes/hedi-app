import { IProfile } from "@/modules/model/IProfile";

//TODO change displayed displayName
export type Location = Pick<IProfile, "display" | "lat" | "long">;
