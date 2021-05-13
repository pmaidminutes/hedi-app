import { getUserAuthHeader } from "@/modules/auth/server";
import {
  sendAPIErrorIfEmptyOrUnauthorized,
  sendAPIResult,
} from "@/modules/common/utils";
import { IEntity } from "@/modules/model";
import { NextApiHandler } from "next";
import { getCurrentProfileEntity } from "./query";

export const getCurrentProfileEntityAPI: NextApiHandler<IEntity | null> = async (
  req,
  res
) => {
  const authHeader = await getUserAuthHeader(req);
  const { isErrorSent } = await sendAPIErrorIfEmptyOrUnauthorized(
    req,
    res,
    authHeader
  );
  if (isErrorSent || !authHeader) return;

  const { lang } = JSON.parse(req.body) as { lang: string };
  const profile = await getCurrentProfileEntity(lang, authHeader);
  sendAPIResult(res, profile);
};
