import { IAppPage } from "@/modules/common/types";
import { ITyped } from "@/modules/model";
import { SimpleAppPageView } from "@/modules/common/components/AppPage";
import { simpleAppPageKeys } from "../../types/SimpleAppPageKeys";
import { capitalizeFirstLetter } from "../../helper/NamingHelpers";

export const TrySimpleAppPage = ({
  content,
}: {
  content: ITyped;
}): JSX.Element | null =>
  simpleAppPageKeys
    .map(key => capitalizeFirstLetter(key))
    .includes(content.type) ? (
    <SimpleAppPageView content={content as IAppPage} />
  ) : null;
