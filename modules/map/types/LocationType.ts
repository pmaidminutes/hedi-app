// export type Location = Pick<IProfile, "displayName" | "lat" | "long">;

import { LatLngExpression } from "leaflet";

// HACK currently incompatible
export type Location = { label: string; latLong: LatLngExpression };
