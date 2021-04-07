const searchAPIUrl = "/api/{lang}/search";
const suggestAPIUrl = "/api/{lang}/suggest";

export const getSearchAPIUrl = (lang: string) =>
  searchAPIUrl.replace("{lang}", lang);

export const getSuggestAPIUrl = (lang: string) =>
  suggestAPIUrl.replace("{lang}", lang);
