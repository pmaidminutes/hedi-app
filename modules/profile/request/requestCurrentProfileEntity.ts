import { jsonPost } from "@/modules/common/utils";
import { IEntity } from "@/modules/model";

export const requestCurrentProfileEntity = (
  lang: string
): Promise<IEntity | null> =>
  jsonPost<IEntity>("/api/user/profile/entity", {
    lang,
  });
