import { IsIHTTPError } from "@/common/errorHandling";
import { IHTTPError } from "@/common/types";
import { getArticle } from "@/modules/editorial/article";
import { getCategory } from "@/modules/editorial/category";
import { getGlossaryTerm } from "@/modules/editorial/glossary";
import { IArticle, ICategory, IGlossaryTerm } from "@/modules/editorial/types";
import { searchServer } from "@/modules/search/request/searchServer";
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
    filter,
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
      switch (entry.ss_type) {
        case "article":
          promises.push(
            getArticle("/" + path, lang).then(article => {
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
            getCategory("/" + path, lang).then(category => {
              if (category)
                category.label = highlight.highlightedTitle ?? category.label;
              return category;
            })
          );
          break;
        case "glossaryterm":
          promises.push(
            getGlossaryTerm("/" + path, lang).then(glossary => {
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
