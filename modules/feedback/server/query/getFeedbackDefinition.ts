import { gql, serviceGQuery } from "@/modules/graphql";
import { AppPageGQL, IAppPage } from "@/modules/common/types";
import { IFeedbackView } from "../../types";
import { EntityFields } from "@/modules/model";
import { getUIElementValue } from "@/modules/common/utils";
import { logAndFallback } from "@/modules/common/error";
import { getProfileDefinition } from "@/modules/profile/server/query/getProfileDefinition";
import { WithKeyFields } from "@/modules/model/IWithKey";
import { IPage } from "@/modules/page/types";

export async function getFeedbackDefinition(appPage: IPage): Promise<IPage> {
  // const profileDefinition = await getProfileDefinition(appPage.lang);
  // return profileDefinition;
  throw new Error(
    "NOT IMPLEMENTED. call it after Profile page is made. this returns Profile Page"
  );
}
