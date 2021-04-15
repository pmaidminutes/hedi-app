import { IAppPage } from "@/modules/common/types";
import { ITyped } from "@/modules/model";
import { AppPageView } from "./AppPageView";
import { appPageKeys } from "../../types/appPageKeys";
import { capitalizeFirstLetter } from "../../helper/NamingHelpers";

export const TryAppPage = ({
  content,
}: {
  content: ITyped;
}): JSX.Element | null =>
  appPageKeys
    .map(key => capitalizeFirstLetter(key))
    .includes(content.type) ? (
    <AppPageView content={content as IAppPage} />
  ) : null;
