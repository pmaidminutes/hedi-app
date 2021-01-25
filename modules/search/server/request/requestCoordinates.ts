import { IHTTPError } from "@/modules/common/error";
import { ICoordinatesJSON } from "../../types";

export async function requestCoordinates(typedAddress: string) {
  const response = await fetch(
    "https://nominatim.openstreetmap.org/search?format=json&polygon_geojson=1&q=" +
      typedAddress,
    {
      method: "GET",
    }
  );
  if (response.status === 200)
    return response.json() as Promise<ICoordinatesJSON[]>;
  else
    return { code: response.status, text: response.statusText } as IHTTPError;
}
