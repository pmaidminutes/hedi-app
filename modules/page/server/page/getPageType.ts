import { getLoginPage } from "@/modules/login/server";
import { getRegistrationPage } from "@/modules/registration/server";
import { IPageConfig } from "@/modules/shell/types";
import { IPage } from "../../types";
import { getPagePage } from "./getPagePage";
import { getLayout } from "@/modules/shell/server";
import { getTemplate } from "@/modules/template/server";
import { getFeedbackPage } from "@/modules/feedback/server/pages";
import { getLandingPage } from "@/modules/landingPage/server";
export const getPageType = async (
  content: IPage
): Promise<IPage & IPageConfig> => {
  let result;
  switch (content.id) {
    case "login":
      result = await getLoginPage(content);
      break;
    case "feedback":
      result = await getFeedbackPage(content);
      break;
    case "register":
      result = await getRegistrationPage(content);
      break;
    case "landingpage":
      result = await getLandingPage(content);
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
