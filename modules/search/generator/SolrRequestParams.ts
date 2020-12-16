export function getSolrRequestParams(
  lang: string,
  searchText: string,
  filter: string | string[],
  getHighlighted: boolean
) {
  const languageFilter = `) `;
  const solarFields =
    "tm_X3b_*, ss_search_api_id, id, site, voll, ss_type,its_nid";
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
  const optionParams = { wt: "json", fl: solarFields };
  const requestBody = {
    query:
      !searchText || searchText.length === 0
        ? "*:*" + languageFilter
        : `voll:(` + searchText + languageFilter,
    filter: `ss_search_api_language:${lang}`,
    params: getHighlighted ? highlightParams : optionParams,
  };
  return JSON.stringify(requestBody);
}
