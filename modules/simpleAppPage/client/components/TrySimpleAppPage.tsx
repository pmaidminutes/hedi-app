import { IAppPage } from "@/modules/common/types";
import { ITyped } from "@/modules/model";
import { SimpleAppPageView } from "@/modules/common/components/AppPage";
import { simpleAppPages } from "../../types/SimpleAppPages";

export const TrySimpleAppPage = (content: ITyped): JSX.Element | null =>
  simpleAppPages.includes(content.type) ? (
    <SimpleAppPageView
      content={content as IAppPage}
      rootCssClass="simple-app-page"
    />
  ) : null;
