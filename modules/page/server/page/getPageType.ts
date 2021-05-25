import { getLoginPage } from "./getLoginPage";
import { IPageConfig } from "@/modules/shell/types";
import { IPage } from "../../types";
import { getPagePage } from "./getPagePage";
import { getTestPage, ITest } from "./getTestPage";
import { getLayout } from "./getLayout";
export const getPageType = async (
  content: IPage
): Promise<(IPage | ITest) & IPageConfig> => {
  let result;
  switch (content.id) {
    case "test":
      result = await getTestPage(content);
      break;
    case "login":
      result = await getLoginPage(content);
      break;

    default:
      result = await getPagePage(content);
  }
  const shell = getLayout(result);
  // HACK TS: if getSegmentsContent is assigned to content directly, and in the isIAppPage guard applies, ts infers content could be an IAppPage...
  return { ...shell, ...result };
};
