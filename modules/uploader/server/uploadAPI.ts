import {
  sendAPIErrorIfUnauthorized,
  sendAPIResult,
} from "@/modules/common/utils";
import { NextApiHandler } from "next";
import { IMediaMutationResult } from "../types";
import { getUserAuthHeader, getUserInfo } from "@/modules/auth/server";
import { extractPostedData, ISavedFileInfo } from "./extractPostedData";
import { getSafeFilename, saveBufferToDisk } from "./saveTools";
import { getMediaType } from "./helpers";
import { insertMedia } from "../query/insertMedia";
import pathUtils from "path";

// TODO under development
export const uploadAPI: NextApiHandler<IMediaMutationResult[]> = async (
  req,
  res
) => {
  const authHeader = await getUserAuthHeader(req);
  const { isErrorSent } = await sendAPIErrorIfUnauthorized(
    req,
    res,
    authHeader
  );
  if (isErrorSent || !authHeader) return;

  const userInfo = await getUserInfo(req);
  if (!userInfo) return;

  const { files, lang, label, description, ...rest } = await extractPostedData(
    req
  );
  const uploadedItems = [] as ISavedFileInfo[];
  const userFoldername = getSafeFilename(userInfo.email ?? userInfo.name);
  if (files?.length) {
    for (let fileItem of files) {
      const { fieldname, originalname } = fileItem;
      const saveResult = saveBufferToDisk(
        fileItem.content,
        pathUtils.join(`${process.env.CMS_UPLOAD_PATH}`, userFoldername),
        `${originalname}`
      );

      uploadedItems.push({
        fieldname,
        originalname,
        savedAsFilename: saveResult.savedAsFilename,
        error: saveResult.error,
      });
    }
  }
  const succeededItems = uploadedItems.filter(item => !item.error);
  const mediaInput = succeededItems.map(item => ({
    filename: userFoldername + "/" + item.savedAsFilename,
    label,
    description,
    mediatype: getMediaType(item.savedAsFilename as string),
  }));
  const result = await insertMedia(authHeader, mediaInput, lang);

  sendAPIResult(res, result);
};
