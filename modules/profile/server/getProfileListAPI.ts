import { NextApiHandler } from "next";
import { getProfileList, ProfileListView } from "../query";

export const getProfileListAPI: NextApiHandler<ProfileListView | null> = async (
  req,
  res
) => {
  const {
    query: { route },
  } = req;
  const profileList = await getProfileList(`${route}`);
  if (profileList) res.status(200).json(profileList);
  else res.status(500).json(null);
};
