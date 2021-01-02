import { IsIHTTPError } from "@/common/errorHandling";
import { IArticle, ICategory, IGlossaryTerm } from "@/modules/editorial/types";
import { getArticleBySlug } from "@/modules/editorial/article";
import { getCategoryBySlug } from "@/modules/editorial/category";
import { searchServer } from "@/modules/search/request/searchServer";
import { NextApiHandler } from "next";
import { IHTTPError } from "@/common/types";
import { getGlossaryTermBySlug } from "@/modules/editorial/glossary";

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
            getArticleBySlug(path, lang).then(article => {
              if (article) {
                article.label = highlight.highlightedTitle ?? article.label;
                article.summary = highlightedBody;
              }
              return article;
            })
          );
          break;
        case "category":
          promises.push(
            getCategoryBySlug(path, lang).then(category => {
              if (category)
                category.label = highlight.highlightedTitle ?? category.label;
              return category;
            })
          );
          break;
        case "glossaryterm":
          promises.push(
            getGlossaryTermBySlug(path, lang).then(glossary => {
              if (glossary) {
                glossary.label = highlight.highlightedTitle ?? glossary.label;
                glossary.description = highlightedBody ?? glossary.description;
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
