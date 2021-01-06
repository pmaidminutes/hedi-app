import { errorHandling } from "@/common/errorHandling";
import { IHTTPError } from "@/common/types";
import { getSolrContentResult, getSolrRequestParams } from "../generator";
import { IContentEntry } from "../types";

export async function searchServer(
  lang: string,
  searchText: string,
  filter: string | string[],
  getHighlighted: boolean
): Promise<IContentEntry[] | IHTTPError> {
  const reqBody = getSolrRequestParams(
    lang,
    searchText,
    filter,
    getHighlighted
  );
  const response = await fetch(process.env.SOLR_URL + "/select", {
    method: "post",
    body: reqBody,
    headers: new Headers({
      "Content-Type": "application/json",
      //TODO call helper method to get the authorization key
      Authorization: "Basic YWRtaW46YWlkbWludXRlcw==",
    }),
  });

  const jsonResponse = await response.json();
  if (response.status !== 200) return errorHandling(response);

  const content = jsonResponse.response.docs;
  if (!content?.length) return errorHandling(response);

  const highlightingContent = jsonResponse.highlighting;
  return content.map((entity: any) =>
    getSolrContentResult(entity, lang, highlightingContent[entity.id])
  ) as Promise<IContentEntry[]>;
}
