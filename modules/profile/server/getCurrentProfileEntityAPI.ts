import {
  sendAPIErrorIfEmptyOrUnauthorised,
  sendAPIResult,
} from "@/modules/common/utils";
import { IEntity } from "@/modules/model";
import { NextApiHandler } from "next";
import { getCurrentProfileEntity } from "../query";

export const getCurrentProfileEntityAPI: NextApiHandler<IEntity | null> = async (
  req,
  res
) => {
  const { isErrorSent, authHeader } = await sendAPIErrorIfEmptyOrUnauthorised(
    req,
    res
  );
  if (isErrorSent || !authHeader) return;

  const { lang } = JSON.parse(req.body) as { lang: string };
  const profile = await getCurrentProfileEntity(lang, authHeader);
  sendAPIResult(res, profile);
};
