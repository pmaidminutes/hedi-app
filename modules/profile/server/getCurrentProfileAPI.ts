import { getUserAuthHeader } from "@/modules/auth/server";
import { NextApiHandler } from "next";
import { ProfileView } from "../query";
import { getCurrentProfile } from "../query";

export const getCurrentProfileAPI: NextApiHandler<ProfileView | null> = async (
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

  const profile = await getCurrentProfile(lang, authHeader);
  if (profile) res.status(200).json(profile);
  else res.status(500).send(null);
};
