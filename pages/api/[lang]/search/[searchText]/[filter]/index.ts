import { IsIHTTPError } from "@/common/errorHandling";
import { IArticle, ICategory } from "@/modules/editorial/types";
import { getArticleBySlug } from "@/modules/editorial/article";
import { getCategoryBySlug } from "@/modules/editorial/category";
import { searchServer } from "@/modules/search/request/searchServer";
import { NextApiHandler } from "next";
import { IHTTPError } from "@/common/types";

const solrSearchHandler: NextApiHandler<
  IHTTPError | (IArticle | ICategory)[]
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
      const [_, path, lang] = entry.search_api_id.split(":");
      switch (entry.ss_type) {
        case "article":
          promises.push(
            getArticleBySlug(path, lang).then(article => {
              if (article) {
                article.label = highlight.highlightedTitle ?? article.label;
                article.summary = highlight.highlightedBody;
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
        // case 'glossary':
        //   promises.push(getGlossaryBySlug(path, lang) as Promise<IEntity>);
        //   break;
      }
    }
    const entries = await Promise.all<IArticle | ICategory | null>(promises);
    const nonNull = entries.filter(entry => entry) as (IArticle | ICategory)[];
    res.send(nonNull);
  }
};
export default solrSearchHandler;
