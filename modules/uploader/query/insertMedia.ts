import { IAuthHeader } from "@/modules/auth/types";
import { logAndNull } from "@/modules/common/error";
import { userGQuery } from "@/modules/graphql";
import {
  IMediaInput,
  insertMediaMutation,
  IMediaMutationResult,
} from "../types";

export async function insertMedia(
  authHeader: IAuthHeader,
  media: IMediaInput[],
  lang?: string
): Promise<IMediaMutationResult[] | null> {
  return userGQuery<{ insertMedia: IMediaMutationResult[] }>(
    authHeader,
    insertMediaMutation,
    {
      input: media,
      lang,
    }
  ).then(data => logAndNull(data)?.insertMedia ?? null);
}
