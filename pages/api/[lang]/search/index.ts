import { IHTTPError, IsIHTTPError } from "@/modules/common/error";
import { parseJSONCoordinates } from "@/modules/common/utils";
import { getArticle } from "@/modules/editorial/article/query";
import { IArticle } from "@/modules/editorial/article/types";
import { getCategory } from "@/modules/editorial/category/query";
import { ICategory } from "@/modules/editorial/category/types";
import { getGlossaryTerm } from "@/modules/editorial/glossary/query";
import { IGlossaryTerm } from "@/modules/editorial/glossary/types";
import { getCaregiver, getMidwife } from "@/modules/profile/query";
import { ICaregiver, IMidwife } from "@/modules/profile/types";
import { requestCoordinates } from "@/modules/search/server/functions";
import { searchServer } from "@/modules/search/server/request";
import { NextApiHandler } from "next";

const solrSearchHandler: NextApiHandler<
  IHTTPError | (IArticle | ICategory | IGlossaryTerm | ICaregiver | IMidwife)[]
> = async (req, res) => {
  const {
    query: { lang, searchText, filter, location, distance },
  } = req;
  const locationJson = await requestCoordinates(`${location}`);
  const locationCoordinates = parseJSONCoordinates(locationJson);
  const data = await searchServer(
    `${lang}`,
    `${searchText}`.split(" ").join(" || "),
    `${filter}`,
    locationCoordinates,
    `${distance}`,
    true
  );

  if (IsIHTTPError(data)) res.send(data);
  else {
    const promises = [];
    for (const entry of data) {
      const highlight = entry.highlightedContent;
      const highlightedBody = Array.isArray(highlight.highlightedBody)
        ? highlight.highlightedBody.join("...")
        : highlight.highlightedBody;
      const [_, path, lang] = entry.search_api_id.split(":");
      const route = "/" + path.replace("taxonomy_term", "taxonomy/term");
      console.log(entry.ss_type);
      switch (entry.ss_type) {
        case "article":
          promises.push(
            getArticle(route, lang).then(article => {
              if (article) {
                article.label = highlight.highlightedTitle ?? article.label;
                article.summary = highlightedBody;
              }
              return article;
            })
          );
          break;
        case "categories":
          promises.push(
            getCategory(route, lang).then(category => {
              if (category)
                category.label = highlight.highlightedTitle ?? category.label;
              return category;
            })
          );
          break;
        case "glossaryterm":
          promises.push(
            getGlossaryTerm(route, lang).then(glossary => {
              if (glossary) {
                glossary.label = highlight.highlightedTitle ?? glossary.label;
                glossary.body = highlightedBody ?? glossary.body;
              }
              return glossary;
            })
          );
          break;
        case "caregiver_tmp":
          promises.push(
            getCaregiver(route).then(caregiver => {
              if (caregiver) {
                caregiver.label = highlight.highlightedTitle ?? caregiver.label;
              }
              return caregiver;
            })
          );
          break;
        case "midwife_tmp":
          promises.push(
            getMidwife(route).then(midwife => {
              if (midwife) {
                midwife.label = highlight.highlightedTitle ?? midwife.label;
              }
              return midwife;
            })
          );
          break;
      }
    }
    const entries = await Promise.all<
      IArticle | ICategory | IGlossaryTerm | ICaregiver | IMidwife | null
    >(promises);
    const nonNull = entries.filter(entry => entry) as (
      | IArticle
      | ICategory
      | IGlossaryTerm
      | ICaregiver
      | IMidwife
    )[];
    res.send(nonNull);
  }
};
export default solrSearchHandler;
