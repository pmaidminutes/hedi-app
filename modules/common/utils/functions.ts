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
  const test = route ? route.split("/").filter(s => s) : [];
  test.shift();
  return test;
};

export const segmentsToRoute = (segments: string[], locale: string) =>
  "/" + locale + "/" + segments.join("/");

export function jsonFetcher<T>(url: RequestInfo) {
  return fetch(url)
    .then(response => response.json())
    .then(jsonResponse => jsonResponse as T);
}
