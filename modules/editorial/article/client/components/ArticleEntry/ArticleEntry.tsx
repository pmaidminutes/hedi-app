import Link from "next/link";
import { useRouter } from "next/router";
import { HTMLWithNextImage } from "@/modules/react/html";
import { IArticleEntry } from "../../../types";

export const ArticleEntry = ({
  article,
}: {
  article: IArticleEntry;
}): JSX.Element => {
  const router = useRouter();
  const { locale, defaultLocale } = router;
  const { label, summary, route } = article;
  return (
    <Link href={route} passHref>
      <a href="#" className="bx--tile bx--tile--clickable hedi-unstyled-link">
        <h4
          dangerouslySetInnerHTML={{
            __html: label,
          }}></h4>
        <HTMLWithNextImage
          data={summary}
          locale={locale === defaultLocale ? null : locale}
        />
      </a>
    </Link>
  );
};
[];
