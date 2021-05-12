import { NextApiHandler } from "next";
import { getUserAuthHeader } from "@/modules/auth/server";
import {
  sendAPIErrorIfUnauthorized,
  sendAPIResult,
} from "@/modules/common/utils";
import { upsertProfileQuery } from "../query";
import { EditProfileInput, IUpsertProfileResponse } from "../types";

export const editProfileAPI: NextApiHandler<IUpsertProfileResponse> = async (
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

  const input = (req.body ? JSON.parse(req.body) : { lang: "de" }) as {
    profile?: EditProfileInput;
    lang: string;
  };
  const result = await upsertProfileQuery(input, authHeader).catch(err => {
    console.warn(err);
    return null;
  });
  sendAPIResult(res, result);
};
