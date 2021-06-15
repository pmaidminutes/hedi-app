import { getLoginPage, getRegistrationPage } from "@/modules/auth/server";
import { IPageConfig } from "@/modules/shell/types";
import { IPage } from "../../types";
import { getPagePage } from "./getPagePage";
import { getLayout } from "@/modules/shell/server";
import { getTemplate } from "@/modules/template/server";

import {
  getFeedbackPage,
  getFeedbackThanksPage,
} from "@/modules/feedback/server/pages";
import { getProfileTestLandingPage } from "@/modules/landingpage/server";
import {
  getProfileListPage,
  getProfilePreviewPage,
  getProfileEditPage,
} from "@/modules/profile/server";

import { getGlossaryPage } from "@/modules/editorial/glossary/server";
import { getCategoryRootPage } from "@/modules/editorial/category/server";

export const getPageType = async (
  content: IPage
): Promise<IPage & IPageConfig> => {
  let result;
  switch (content.id) {
    case "login":
      result = await getLoginPage(content);
      break;
    case "register":
      result = await getRegistrationPage(content);
      break;
    case "profileEdit":
      result = await getProfileEditPage(content);
      break;
    case "profilePreview":
      result = await getProfilePreviewPage(content);
      break;
    case "profileList":
      result = await getProfileListPage(content);
      break;
    case "categoryroot":
      result = await getCategoryRootPage(content);
      break;
    case "feedback":
      result = await getFeedbackPage(content);
      break;
    case "feedbackThanks":
      result = await getFeedbackThanksPage(content);
      break;
    case "profileTestLandingPage":
      result = await getProfileTestLandingPage(content);
      break;
    case "template":
      result = await getTemplate(content);
      break;
    case "glossary":
      result = await getGlossaryPage(content);
      break;
    default:
      result = await getPagePage(content);
  }
  const shell = getLayout(result);
  // HACK TS: if getSegmentsContent is assigned to content directly, and in the isIAppPage guard applies, ts infers content could be an IAppPage...
  return { ...shell, ...result };
};
