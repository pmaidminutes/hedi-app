import { getUserAuthHeader } from "@/modules/auth/server";
import {
  sendAPIErrorIfUnauthorized,
  sendAPIResult,
} from "@/modules/common/utils";
import { NextApiHandler } from "next";
import { getCurrentProfile } from "./query";
import { IUserProfile } from "../types";

export const getCurrentProfileAPI: NextApiHandler<IUserProfile | null> = async (
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

  const { lang } = JSON.parse(req.body) as { lang: string };
  const profile = await getCurrentProfile(lang, authHeader);
  sendAPIResult(res, profile);
};
