import { responseToIHTTPError, IHTTPError } from "@/modules/common/error";

export async function suggestServer(
  lang: string,
  typeText: string
): Promise<IHTTPError | []> {
  const params = {
    "suggest.q": !typeText ? "" : typeText,
  };

  const reqBody = JSON.stringify({ params });
  return fetch(process.env.SOLR_URL + "/suggest", {
    method: "post",
    body: reqBody,
    headers: new Headers({
      "Content-Type": "application/json",
      Authorization: "Basic YWRtaW46YWlkbWludXRlcw==",
    }),
  }).then<[] | IHTTPError>(response =>
    response.status === 200 ? response.json() : responseToIHTTPError(response)
  );
}
