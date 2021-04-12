import { getUserAuthHeader } from "@/modules/auth/server";
import { sendAPIResult } from "@/modules/common/utils";
import { IEntity } from "@/modules/model";
import { NextApiHandler } from "next";
import { getCurrentProfileEntity } from "../query";

export const getCurrentProfileEntityAPI: NextApiHandler<IEntity | null> = async (
  req,
  res
) => {
  if (!req.body) {
    res.status(400).send(null);
    return;
  }

  const { lang } = JSON.parse(req.body) as { lang: string };

  const authHeader = await getUserAuthHeader(req);
  if (!authHeader) {
    res.status(401).send(null);
    return;
  }

  const profile = await getCurrentProfileEntity(lang, authHeader);
  sendAPIResult(res, profile);
};
