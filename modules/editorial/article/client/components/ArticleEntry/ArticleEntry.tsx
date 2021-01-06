import Link from "next/link";
import { HTML } from "@/common/html";
import { IArticleEntry } from "@/modules/editorial/article/types";

export const ArticleEntry = ({ article }: { article: IArticleEntry }) => (
  <Link href={article.route} passHref>
    <a href="#" className="bx--tile bx--tile--clickable hedi-unstyled-link">
      <h4
        dangerouslySetInnerHTML={{
          __html: article.label,
        }}></h4>
      <HTML data={article.summary} />
    </a>
  </Link>
);
