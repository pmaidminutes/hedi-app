/* --- dev helper functions --- */
export function AssertClientSide() {
  return typeof window !== "undefined";
}

export function AssertServerSide() {
  return typeof window === "undefined";
}

// --- Slugify Title --- //
export function slugifyTitle(title: string): string {
  return title.replace(/\s+$/g, "").replace(/\s+/g, "-").toLowerCase();
}

// --- Build assets URL --- //
export function buildAssetUrl(url: string | undefined): string {
  if (url === undefined) return "";
  const BASE_URL = "https://appstaging.projekt-hedi.de/";
  return `${BASE_URL}${url.split("files/")[1]}`;
}

export function jsonFetcher<T>(url: RequestInfo) {
  return fetch(url)
    .then(response => response.json())
    .then(jsonResponse => jsonResponse as T);
}
