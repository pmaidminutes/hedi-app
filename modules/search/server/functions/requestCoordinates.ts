import { IHTTPError } from "@/modules/common/error";
import { ICoordinatesJSON } from "../../types";

export async function requestCoordinates(typedAddress: string) {
  const response = await fetch(process.env.GEO_LOCATION_URL + typedAddress, {
    method: "GET",
  });
  if (response.status === 200)
    return response.json() as Promise<ICoordinatesJSON[]>;
  else
    return { code: response.status, text: response.statusText } as IHTTPError;
}
