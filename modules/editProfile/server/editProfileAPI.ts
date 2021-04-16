import { NextApiHandler } from "next";
import {
  sendAPIErrorIfUnauthorised,
  sendAPIResult,
} from "@/modules/common/utils";
import { upsertProfileQuery } from "../query";
import { EditProfileInput, IUpsertProfile } from "../types";

export const editProfileAPI: NextApiHandler<IUpsertProfile> = async (
  req,
  res
) => {
  const { isErrorSent, authHeader } = await sendAPIErrorIfUnauthorised(
    req,
    res
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
