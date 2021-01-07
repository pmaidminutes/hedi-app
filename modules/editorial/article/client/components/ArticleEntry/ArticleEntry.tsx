import Link from "next/link";
import { HTML } from "@/common/html";
import { IArticleEntry } from "@/modules/editorial/article/types";

export const ArticleEntry = ({
  article,
}: {
  article: IArticleEntry;
}): JSX.Element => {
  const { label, summary, route } = article;
  return (
    <Link href={route} passHref>
      <a href="#" className="bx--tile bx--tile--clickable hedi-unstyled-link">
        <h4
          dangerouslySetInnerHTML={{
            __html: label,
          }}></h4>
        <HTML data={summary} />
      </a>
    </Link>
  );
};
[];
