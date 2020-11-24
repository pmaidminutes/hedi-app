import { IHTTPError } from "./types";

export async function requestCSRF() {
  const response = await fetch(
    process.env.NEXTAUTH_CMS_URL + "/session/token",
    {
      method: "GET",
    }
  );
  if (response.status === 200) return response.text() as Promise<string>;
  else
    return { code: response.status, text: response.statusText } as IHTTPError;
}
