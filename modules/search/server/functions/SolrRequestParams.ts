export function transformParamsToSolrRequestString(
  lang: string,
  searchText: string,
  searchFilter: string,
  getHighlighted: boolean
): string {
  const languageFilter = `) `;
  const solarFields =
    "tm_X3b_*, ss_search_api_id, id, site, voll, ss_type, ss_vid,its_nid";
  const highlightParams = {
    wt: "json",
    fl: solarFields,
    hl: "on",
    "hl.fl": "tm_X3b_*, voll",
    "hl.snippets": "2",
    "hl.fragsize": "200",
    "hl.simple.pre": "<mark>",
    "hl.simple.post": "</mark>",
  };
  enum solrTypeFields {
    articles = "ss_type:article",
    profiles = "ss_type:*_tmp",
    categories = "ss_vid:categories",
  }
  (<(keyof typeof solrTypeFields)[]>Object.keys(solrTypeFields)).map(
    key => (searchFilter = searchFilter.replace(key, solrTypeFields[key]))
  );
  const optionParams = { wt: "json", fl: solarFields };
  const requestBody = {
    query:
      !searchText || searchText.length === 0
        ? "*:*" + languageFilter
        : `voll:(` + searchText + languageFilter,
    //TODO tempfix to overwrite the api path recognition
    filter: [
      `ss_search_api_language:${lang}`,
      `${searchFilter !== "undefined" ? searchFilter : ""}`,
    ],
    params: getHighlighted ? highlightParams : optionParams,
  };
  return JSON.stringify(requestBody);
}
