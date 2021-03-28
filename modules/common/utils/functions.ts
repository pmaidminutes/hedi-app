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

export const routeToSegments = (route?: string) => {
  const segments = route ? route.split("/").filter(s => s) : [];
  segments.shift();
  return segments;
};

export const segmentsToRoute = (segments: string[], locale: string) =>
  "/" + locale + "/" + segments.join("/");

export function jsonFetcher<T>(url: RequestInfo) {
  return fetch(url)
    .then(response => (response.bodyUsed ? response.json() : null))
    .then(jsonResponse => jsonResponse as T); // TODO must be | null as well
}

export function jsonPost<T>(url: RequestInfo, data: object) {
  return fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
  })
    .then(response => (response.bodyUsed ? response.json() : null))
    .then(jsonResponse => jsonResponse as T | null);
}

export function getLangByRoute(route: string) {
  return route
    .split("/")
    .filter(s => s)
    .shift();
}
