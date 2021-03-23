import { IAppPage } from "@/modules/common/types";
import { ITyped } from "@/modules/model";
import { SimplePageView } from "./SimplePageView";
import { simplePageKeys } from "../../types/simplePageKeys";
import { capitalizeFirstLetter } from "../../helper/NamingHelpers";

export const TrySimplePage = ({
  content,
}: {
  content: ITyped;
}): JSX.Element | null =>
  simplePageKeys
    .map(key => capitalizeFirstLetter(key))
    .includes(content.type) ? (
    <SimplePageView content={content as IAppPage} />
  ) : null;
