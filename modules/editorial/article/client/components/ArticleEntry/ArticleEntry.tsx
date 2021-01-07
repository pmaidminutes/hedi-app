import Link from "next/link";
import { HTMLWithNextImage } from "@/common/html";
import { IArticleEntry } from "../../../types";

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
        <HTMLWithNextImage data={summary} />
      </a>
    </Link>
  );
};
[];
