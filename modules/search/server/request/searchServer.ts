import { errorHandling, IHTTPError } from "@/modules/common/error";
import { IContentEntry } from "../../types";
import {
  transformParamsToSolrRequestString,
  transformSolrResultToContentEntry,
} from "../functions";

export async function searchServer(
  lang: string,
  searchText: string,
  filter: string,
  location: string,
  distance: string,
  getHighlighted: boolean
): Promise<IContentEntry[] | IHTTPError> {
  const reqBody = transformParamsToSolrRequestString(
    lang,
    searchText,
    filter,
    location,
    distance,
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
    transformSolrResultToContentEntry(
      entity,
      lang,
      highlightingContent[entity.id]
    )
  ) as Promise<IContentEntry[]>;
}
``;
