import { ICoordinatesJSON } from "@/modules/search/types";
import { IHTTPError, IsIHTTPError } from "../error";

/* --- dev helper functions --- */
export function AssertClientSide() {
  return typeof window !== "undefined";
}

export function AssertServerSide() {
  return typeof window === "undefined";
}

// HACK: should be solved on backend gql side
// --- Build assets URL --- //
export function buildAssetUrl(url: string | undefined): string {
  if (url === undefined) return "";
  const BASE_URL = "https://appstaging.projekt-hedi.de";
  return `${BASE_URL}${url}`;
}

export const routeToSegments = (route?: string) =>
  route ? route.split("/").filter(s => s) : [];

export const segmentsToRoute = (segments: string[]) => "/" + segments.join("/");

export function jsonFetcher<T>(url: RequestInfo) {
  return fetch(url)
    .then(response => response.json())
    .then(jsonResponse => jsonResponse as T);
}
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
