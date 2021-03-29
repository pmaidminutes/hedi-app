import { getUserAuthHeader } from "@/modules/auth/server";
import { IEntity } from "@/modules/model";
import { NextApiHandler } from "next";
import { getCurrentProfileEntity } from "../query";

export const getCurrentProfileEntityAPI: NextApiHandler<IEntity | null> = async (
  req,
  res
) => {
  if (!req.body) {
    res.status(400);
    return;
  }

  const { lang } = JSON.parse(req.body) as { lang: string };

  const authHeader = await getUserAuthHeader(req);
  if (!authHeader) {
    res.status(401);
    return;
  }

  const profile = await getCurrentProfileEntity(lang, authHeader);
  if (profile) res.status(200).json(profile);
  else res.status(500);
};
