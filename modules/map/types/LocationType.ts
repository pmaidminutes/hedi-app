import { IProfile } from "@/modules/model/IProfile";

// export type Location = Pick<IProfile, "displayName" | "lat" | "long">;
// HACK currently incompatible
export type Location = { displayName: string; lat: string; long: string };
