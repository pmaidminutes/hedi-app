import { IHTTPError, IsIHTTPError } from "@/modules/common/error";
import { getArticle } from "@/modules/editorial/article/query";
import { IArticle } from "@/modules/editorial/article/types";
import { getCategory } from "@/modules/editorial/category/query";
import { ICategory } from "@/modules/editorial/category/types";
import { getGlossaryTerm } from "@/modules/editorial/glossary/query";
import { IGlossaryTerm } from "@/modules/editorial/glossary/types";
import { searchServer } from "@/modules/search/server/request";
import { NextApiHandler } from "next";

const solrSearchHandler: NextApiHandler<
  IHTTPError | (IArticle | ICategory | IGlossaryTerm)[]
> = async (req, res) => {
  const {
    query: { lang, searchText, filter },
  } = req;

  const data = await searchServer(
    `${lang}`,
    `${searchText}`.split(" ").join(" || "),
    `${filter}`,
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
      }
    }
    const entries = await Promise.all<
      IArticle | ICategory | IGlossaryTerm | null
    >(promises);
    const nonNull = entries.filter(entry => entry) as (
      | IArticle
      | ICategory
      | IGlossaryTerm
    )[];
    res.send(nonNull);
  }
};
export default solrSearchHandler;
