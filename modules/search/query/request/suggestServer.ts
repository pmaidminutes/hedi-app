import { errorHandling } from "@/common/errorHandling";
import { IHTTPError } from "@/common/types";

export async function suggestServer(
  lang: string,
  typeText: string
): Promise<IHTTPError | []> {
  const params = {
    "terms.fl": "voll",
    "terms.prefix": !typeText ? "" : typeText,
  };

  const reqBody = JSON.stringify({ params });
  const response = await fetch(process.env.SOLR_URL + "/autocomplete", {
    method: "post",
    body: reqBody,
    headers: new Headers({
      "Content-Type": "application/json",
      Authorization: "Basic YWRtaW46YWlkbWludXRlcw==",
    }),
  });
  const jsonResponse = await response.json();

  if (response.status !== 200) {
    return errorHandling(response);
  } else {
    return jsonResponse as Promise<[]>;
  }
}
