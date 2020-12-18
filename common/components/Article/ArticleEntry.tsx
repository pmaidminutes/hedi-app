import Link from "next/link";
import { IArticleEntry } from "@/modules/editorial/types";

export function ArticleEntry({ article }: { article: IArticleEntry }) {
  return (
    <div
      className="bx--col-sm-4 bx--col-md-4 bx--col-lg-8"
      key={article.urlpath}>
      <Link href={article.urlpath} passHref>
        <a href="#" className="bx--tile bx--tile--clickable hedi-unstyled-link">
          <h4
            dangerouslySetInnerHTML={{
              __html: article.label,
            }}></h4>
          <p
            dangerouslySetInnerHTML={{
              __html: article.summary,
            }}></p>
        </a>
      </Link>
    </div>
  );
}
