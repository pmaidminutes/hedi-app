/* --- dev helper functions --- */
export function AssertClientSide() {
  return typeof window !== "undefined";
}

export function AssertServerSide() {
  return typeof window === "undefined";
}

export function AssertEnvDev() {
  return process.env.NODE_ENV === "development";
}

export function AssertEnvProduction() {
  return process.env.NODE_ENV === "production";
}

// HACK: should be solved on backend gql side
// --- Build assets URL --- //
export function buildAssetUrl(url: string | undefined): string {
  if (url === undefined) return "";
  const BASE_URL = process.env.NEXT_PUBLIC_APP_URL;
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
    .then(response => response.json().catch(() => null))
    .then(jsonResponse => jsonResponse as T); // TODO must be | null as well
}

export function jsonPost<T>(
  url: RequestInfo,
  data: object,
  returnAsText = false
) {
  return fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
  })
    .then(response =>
      (returnAsText ? response.text() : response.json()).catch(() => null)
    )
    .then(jsonResponse => jsonResponse as T | null);
}

export function getLangByRoute(route: string) {
  return route
    .split("/")
    .filter(s => s)
    .shift();
}

export function prettifyUrl(url: string) {
  if (url === null) return;
  return url.replace(/(^\w+:|^)\/\//, "");
}

export function formatPhoneNumber(phoneNumber: string) {
  // TODO make better just a HACK for test
  let newString = phoneNumber.match(/[0-9]{0,14}/g)?.join("");
  if (!newString) {
    return null;
  }
  let editedNumber = newString.slice(1);
  return newString.startsWith("00")
    ? `+${newString.substr(2)}`
    : newString.startsWith("0")
    ? `+49${editedNumber}`
    : newString.startsWith("049")
    ? `+${editedNumber}`
    : newString.startsWith("49")
    ? `+${newString}`
    : newString.startsWith("0049")
    ? newString
    : newString;
}

export function transformStringToUrl(string: string) {
  return !string ||
    string.startsWith("http://") ||
    string.startsWith("https://")
    ? string
    : `http://${string}`;
}

// HACK carbon typing is not aligned with current online documentation.
// our current version might be not up to date
export function convertToCarbonSize(
  size?: "sm" | "md" | "lg"
): "sm" | "xl" | undefined {
  switch (size) {
    case "lg":
      return "xl";
    case "md":
      return undefined;
    default:
      return size;
  }
}

export function isEven(value: number) {
  return value % 2 === 0 ? true : false;
}
