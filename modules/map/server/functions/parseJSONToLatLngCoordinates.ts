import { IHTTPError, IsIHTTPError } from "@/modules/common/error";
import { ICoordinatesJSON } from "../../types";

export function parseJSONToLatLngCoordinates(
  jsonAsString: string | IHTTPError
): string {
  if (!IsIHTTPError(jsonAsString)) {
    const parsedJSON: ICoordinatesJSON = JSON.parse(jsonAsString);
    return parsedJSON?.items[0]?.position
      ? parsedJSON.items[0].position.lat +
          "," +
          parsedJSON.items[0].position.lng
      : "";
  }
  return "";
}
