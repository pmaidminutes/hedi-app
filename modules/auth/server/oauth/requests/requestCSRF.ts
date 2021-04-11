import { IHTTPError } from "@/modules/common/error";

export async function requestCSRF() {
  const response = await fetch(process.env.CMS_URL + "/session/token", {
    method: "GET",
  });
  if (response.status === 200) return response.text() as Promise<string>;
  else
    return {
      status: response.status,
      message: response.statusText,
    } as IHTTPError;
}
