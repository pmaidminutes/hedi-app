import { HTMLWithNextImage } from "@/modules/react/html";
import { ClickableTile } from "carbon-components-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { IPageEntry } from "../../../types";

export const PageEntry = ({ page }: { page: IPageEntry }): JSX.Element => {
  const router = useRouter();
  const { locale, defaultLocale } = router;
  const { label, summary, route } = page;
  return (
    <Link href={route} passHref>
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
    </Link>
  );
};
[];
