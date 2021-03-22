import { NextApiHandler } from "next";
import { IsIHTTPError } from "@/modules/common/error";
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
    if (!result) res.status(500).json({ success: false });
    else if (IsIHTTPError(result))
      res
        .status(result.code)
        .json({ success: false, errors: { http: result.text } });
    else res.status(200).json(result);
  }
};
