import { responseToIHTTPError, IHTTPError } from "@/modules/common/error";

export async function requestCoordinates(typedAddress: string) {
  return fetch(process.env.GEO_LOCATION_URL + encodeURI(typedAddress), {
    method: "GET",
  }).then<string | IHTTPError>(response =>
    response.status === 200 ? response.text() : responseToIHTTPError(response)
  );
}
