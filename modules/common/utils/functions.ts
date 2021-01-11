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
  const BASE_URL = "https://appstaging.projekt-hedi.de/";
  return `${BASE_URL}${url.split("files/")[1]}`;
}

export const routeToSegments = (route?: string) =>
  route ? route.split("/").filter(s => s) : [];

export const segmentsToRoute = (segments: string[]) => "/" + segments.join("/");

export function jsonFetcher<T>(url: RequestInfo) {
  return fetch(url)
    .then(response => response.json())
    .then(jsonResponse => jsonResponse as T);
}
