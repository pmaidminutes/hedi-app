import { IAppPage } from "@/modules/common/types";
import { HTML } from "@/modules/react/html";
import { ClickableTile } from "carbon-components-react";
import Link from "next/link";

export const AppPageEntryView = ({
  appPageEntry,
}: {
  appPageEntry: IAppPage;
}): JSX.Element => {
  const { label, route } = appPageEntry;
  return (
    <Link href={route} passHref>
      <ClickableTile href={route}>
        {/* TODO: check if h4 is right for hierachy */}
        <h4
          dangerouslySetInnerHTML={{
            __html: label,
          }}></h4>
      </ClickableTile>
    </Link>
  );
};
[];
