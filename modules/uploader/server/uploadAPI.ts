import {
  sendAPIErrorIfEmptyOrUnauthorized,
  sendAPIResult,
} from "@/modules/common/utils";
import { NextApiHandler } from "next";
import { IUploadResult } from "../types";
import { getUserAuthHeader } from "@/modules/auth/server";
import {
  extractPostedData,
  ISavedFileInfo,
  IUploadedFileInfo,
} from "./extractPostedData";
import { saveBufferToDisk } from "./saveTools";
import { getGuid } from "./helpers";

// TODO under development
export const uploadAPI: NextApiHandler<IUploadResult[]> = async (req, res) => {
  const authHeader = await getUserAuthHeader(req);
  const { isErrorSent } = await sendAPIErrorIfEmptyOrUnauthorized(
    req,
    res,
    authHeader
  );
  if (isErrorSent) return;

  const { files, ...rest } = await extractPostedData(req);
  const uploadedItems = [] as ISavedFileInfo[];
  if (files?.length) {
    for (let index = 0; index < files.length; index++) {
      const fileItem = files[index];

      const { fieldname, originalname } = fileItem;
      const uuid = getGuid();
      const extension = originalname.split(".")[
        originalname.split(".").length - 1
      ];
      const saveResult = saveBufferToDisk(
        fileItem.content,
        `${process.env.CMS_UPLOAD_PATH}`,
        `${uuid}.${extension}`
      );

      uploadedItems.push({
        fieldname,
        originalname,
        uuid,
        extension,
        error: saveResult.error,
      });
    }
  }

  // TODO save uploaded files (uploadedItems) as drupal-media using gql-mutation
  const result: IUploadResult[] = []; // the result of gql-mutation

  sendAPIResult(res, result);
};
