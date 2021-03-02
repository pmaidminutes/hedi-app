import { HTMLWithNextImage } from "@/modules/react/html";
import { ClickableTile } from "carbon-components-react";
import Link from "next/link";
import { IPageEntry } from "../../../types";

export const PageEntry = ({ page }: { page: IPageEntry }): JSX.Element => {
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
        />
      </ClickableTile>
    </Link>
  );
};
[];
