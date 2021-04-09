import { NextApiHandler } from "next";
import { sendAPIResult } from "@/modules/common/utils";
import { getUserAuthHeader } from "@/modules/auth/server";
import { upsertProfileQuery } from "../query";
import { EditProfileInput, IUpsertProfile } from "../types";

export const editProfileAPI: NextApiHandler<IUpsertProfile> = async (
  req,
  res
) => {
  const input = (req.body ? JSON.parse(req.body) : { lang: "de" }) as {
    profile?: EditProfileInput;
    lang: string;
  };
  const authHeader = await getUserAuthHeader(req);
  if (!authHeader) res.status(401).json({ success: false });
  else {
    const result = await upsertProfileQuery(input, authHeader).catch(err => {
      console.warn(err);
      return null;
    });
    sendAPIResult(res, result);
  }
};
