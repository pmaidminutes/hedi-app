export function transformParamsToSolrRequestString(
  lang: string,
  searchText: string,
  searchFilter: string,
  location: string,
  distance: string,
  getHighlighted: boolean
): string {
  const languageFilter = `) `;
  const solarFields =
    "tm_X3b_*, ss_search_api_id, id, site, voll, ss_type, ss_vid, its_nid, locs_lat_long";
  const isLocationPresent = `${location}` ? true : false;
  const highlightParams = {
    wt: "json",
    fl: solarFields,
    hl: "on",
    "hl.fl": "tm_X3b_*, voll",
    "hl.snippets": "2",
    "hl.fragsize": "200",
    "hl.simple.pre": "<mark>",
    "hl.simple.post": "</mark>",
    fq: isLocationPresent ? "{!geofilt}" : "",
    sfield: isLocationPresent ? "locs_lat_long" : "",
    pt: isLocationPresent ? `${location}` : "",
    d: isLocationPresent ? `${distance}` : "",
  };
  enum solrTypeFields {
    articles = "ss_type:article",
    pages = "ss_type:page",
    profiles = "ss_type:*_tmp",
    categories = "ss_vid:categories",
  }
  (<(keyof typeof solrTypeFields)[]>Object.keys(solrTypeFields)).map(
    key => (searchFilter = searchFilter.replace(key, solrTypeFields[key]))
  );

  const optionParams = {
    wt: "json",
    fl: solarFields,
    fq: isLocationPresent ? "{!geofilt}" : "",
    sfield: isLocationPresent ? "locs_lat_long" : "",
    pt: isLocationPresent ? `${location}` : "",
    d: isLocationPresent ? `${distance}` : "",
  };
  const requestBody = {
    query:
      !searchText || searchText.length === 0
        ? "*:*" + languageFilter
        : `voll:(` + searchText + languageFilter,
    filter: [`ss_search_api_language:${lang}`, `${searchFilter}`],
    params: getHighlighted ? highlightParams : optionParams,
  };
  console.log(requestBody);
  return JSON.stringify(requestBody);
}
