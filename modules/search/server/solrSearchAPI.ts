import { IErrorResponse, IsIHTTPError } from "@/modules/common/error";
import { getArticle } from "@/modules/editorial/article/query";
import { IArticle } from "@/modules/editorial/article/types";
import { getCategory } from "@/modules/editorial/category/query";
import { ICategory } from "@/modules/editorial/category/types";
import { getGlossaryTerm } from "@/modules/editorial/glossary/query";
import { IGlossaryTerm } from "@/modules/editorial/glossary/types";
import { parseJSONToLatLngCoordinates } from "@/modules/map/server/functions";
import { requestCoordinates } from "@/modules/map/server/request";
import { searchServer } from "./request";
import { NextApiHandler } from "next";
import { sendAPIHttpError, sendAPISuccess } from "@/modules/common/utils";
import { IPage } from "@/modules/page/types";

export const solrSearchAPI: NextApiHandler<
  IErrorResponse | (IArticle | ICategory | IGlossaryTerm | IPage)[]
> = async (req, res) => {
  const {
    query: { lang, searchText, filter, location, distance },
  } = req;
  const locationJson = await requestCoordinates(`${location}`);
  const locationCoordinates = parseJSONToLatLngCoordinates(locationJson);
  const data = await searchServer(
    `${lang}`,
    `${searchText}`.split(" ").join(" || "),
    `${filter}`,
    locationCoordinates,
    `${distance}`,
    true
  );

  if (IsIHTTPError(data)) sendAPIHttpError(res, data);
  else {
    const promises = [];
    for (const entry of data) {
      const highlight = entry.highlightedContent;
      const highlightedBody = Array.isArray(highlight.highlightedBody)
        ? highlight.highlightedBody.join("...")
        : highlight.highlightedBody;
      const [_, path, lang] = entry.search_api_id.split(":");
      const route = "/" + path.replace("taxonomy_term", "taxonomy/term");
      switch (entry.ss_type) {
        case "article":
          promises.push(
            getArticle(route).then(article => {
              if (article) {
                article.label = highlight.highlightedTitle ?? article.label;
                article.summary = { kind: "Body", body: highlightedBody };
              }
              return article;
            })
          );
          break;
        // case "page":
        //   promises.push(
        //     getAppPage(route).then(page => {
        //       if (page) {
        //         page.label = highlight.highlightedTitle ?? page.label;
        //         // page.body = highlightedBody;
        //       }
        //       return page;
        //     })
        //   );
        //   break;
        case "category":
          promises.push(
            getCategory(route).then(category => {
              if (category)
                category.label = highlight.highlightedTitle ?? category.label;
              return category;
            })
          );
          break;
        case "glossary_term":
          promises.push(
            getGlossaryTerm(route).then(glossary => {
              if (glossary) {
                glossary.label = highlight.highlightedTitle ?? glossary.label;
                glossary.body = highlightedBody ?? glossary.body;
              }
              return glossary;
            })
          );
          break;
      }
    }
    const entries = await Promise.all<
      IArticle | ICategory | IGlossaryTerm | IPage | null
    >(promises);
    const nonNull = entries.filter(entry => entry) as (
      | IArticle
      | ICategory
      | IGlossaryTerm
      | IPage
    )[];
    sendAPISuccess(res, nonNull);
  }
};
export default solrSearchAPI;
