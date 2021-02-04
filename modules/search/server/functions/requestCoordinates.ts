import { IHTTPError } from "@/modules/common/error";

export async function requestCoordinates(typedAddress: string) {
  const response = await fetch(
    process.env.GEO_LOCATION_URL + encodeURI(typedAddress),
    {
      method: "GET",
    }
  );
  if (response.status === 200) return response.text() as Promise<string>;
  else
    return { code: response.status, text: response.statusText } as IHTTPError;
}
