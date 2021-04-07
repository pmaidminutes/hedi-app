import { jsonPost } from "@/modules/common/utils";
import { IEntity } from "@/modules/model";
import { userProfileEntityAPIUrl } from "../types";

export const requestCurrentProfileEntity = (
  lang: string
): Promise<IEntity | null> =>
  jsonPost<IEntity>(userProfileEntityAPIUrl, {
    lang,
  });
