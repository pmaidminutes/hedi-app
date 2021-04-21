import {
  sendAPIErrorIfEmptyOrUnauthorized,
  sendAPIResult,
} from "@/modules/common/utils";
import { NextApiHandler } from "next";
import { IUploadPayload, IUploadResult } from "../types";
import nextConnect from "next-connect";
import multer from "multer";
import { getUserAuthHeader } from "@/modules/auth/server";
import { Guid } from "typescript-guid";

interface UploadedFileInfo {
  fieldname: string;
  originalname: string;
  mimetype: string;
  uuid: string;
  extension: string;
}

const uploadedItems: UploadedFileInfo[] = [];
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => cb(null, `${process.env.CMS_UPLOAD_PATH}`),
    filename: (req, file, cb) => {
      const { fieldname, originalname, mimetype } = file;
      const extension = originalname.split(".")[
        originalname.split(".").length - 1
      ];
      const uuid = Guid.create().toString();
      uploadedItems.push({
        fieldname,
        originalname,
        mimetype,
        uuid,
        extension,
      });

      cb(null, uuid + "." + extension);
    },
  }),
  fileFilter: (req, file, cb) => {
    // TODO add all valid mimetypes here / global config file
    const isValidFile = ["image/png", "image/jpg", "application/pdf"].includes(
      file.mimetype
    );
    cb(null, isValidFile);
  },
}).any();

const apiRoute = nextConnect();
apiRoute.use(upload);

// TODO under development
export const uploadAPI: NextApiHandler<IUploadResult[]> = async (req, res) => {
  const authHeader = await getUserAuthHeader(req);
  const { isErrorSent } = await sendAPIErrorIfEmptyOrUnauthorized(
    req,
    res,
    authHeader
  );
  if (isErrorSent) return;

  await apiRoute.run(req, res);

  const { kind, metadata } = req.body as IUploadPayload;
  // TODO save uploaded files (uploadedItems) as drupal-media using gql-mutation
  const result: IUploadResult[] = []; // the result of gql-mutation

  sendAPIResult(res, result);
};
