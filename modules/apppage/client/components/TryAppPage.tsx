import { IAppPage } from "@/modules/common/types";
import { ITyped } from "@/modules/model";
import { AppPageView } from "./AppPageView";

export const TryAppPage = ({
  content,
}: {
  content: ITyped;
}): JSX.Element | null =>
  content.type === "AppPage" ? (
    <AppPageView content={content as IAppPage} />
  ) : null;