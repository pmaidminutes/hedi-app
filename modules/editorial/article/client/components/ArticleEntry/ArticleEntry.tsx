import { useRouter } from "next/router";
import { HTMLWithNextImage } from "@/modules/react/html";
import { IArticleEntry } from "../../../types";
import { ClickableTile } from "carbon-components-react";

export const ArticleEntry = ({
  article,
}: {
  article: IArticleEntry;
}): JSX.Element => {
  const router = useRouter();
  const { locale, defaultLocale } = router;
  const { label, summary, route } = article;
  return (
    <ClickableTile href={route}>
      {/* TODO: check if h4 is right for hierachy */}
      <h4
        dangerouslySetInnerHTML={{
          __html: label,
        }}></h4>
      <HTMLWithNextImage
        data={summary}
        locale={locale === defaultLocale ? null : locale}
      />
    </ClickableTile>
  );
};
[];
