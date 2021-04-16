import {
  sendAPIErrorIfUnauthorized,
  sendAPIResult,
} from "@/modules/common/utils";
import { NextApiHandler } from "next";
import { getCurrentProfile } from "../query";
import { Profile } from "../types";

export const getCurrentProfileAPI: NextApiHandler<Profile | null> = async (
  req,
  res
) => {
  const { isErrorSent, authHeader } = await sendAPIErrorIfUnauthorized(
    req,
    res
  );
  if (isErrorSent || !authHeader) return;

  const { lang } = JSON.parse(req.body) as { lang: string };
  const profile = await getCurrentProfile(lang, authHeader);
  sendAPIResult(res, profile);
};
