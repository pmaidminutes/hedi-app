import { NextApiHandler } from "next";
import { upsertProfileQuery } from "../query";
import { EditProfileInput, IUpsertProfile } from "../types";

export const editProfileAPI: NextApiHandler<IUpsertProfile> = async (
  req,
  res
) => {
  const input = req.body ? (JSON.parse(req.body) as EditProfileInput) : null;

  await upsertProfileQuery(input, req, res)
    .then(resp => res.status(200).json(resp))
    .catch(err => res.status(500).json({ success: false }));
};
