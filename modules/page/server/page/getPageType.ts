import { getLoginPage } from "./getLoginPage";
import { IPageConfig } from "@/modules/shell/types";
import { IPage } from "../../types";
import { getPagePage } from "./getPagePage";
import { getLayout } from "@/modules/shell/server";
import { getTemplate } from "@/modules/template/server";
import {
  getProfileListPage,
  getProfilePreviewPage,
} from "@/modules/profile/server";

export const getPageType = async (
  content: IPage
): Promise<IPage & IPageConfig> => {
  let result;
  switch (content.id) {
    case "login":
      result = await getLoginPage(content);
      break;
    case "profilePreview":
      result = await getProfilePreviewPage(content);
      break;
    case "profileList":
      result = await getProfileListPage(content);
      break;
    case "template":
      result = await getTemplate(content);
      break;
    default:
      result = await getPagePage(content);
  }
  const shell = getLayout(result);
  // HACK TS: if getSegmentsContent is assigned to content directly, and in the isIAppPage guard applies, ts infers content could be an IAppPage...
  return { ...shell, ...result };
};
