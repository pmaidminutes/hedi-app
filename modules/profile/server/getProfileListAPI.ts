import { sendAPIResult } from "@/modules/common/utils";
import { NextApiHandler } from "next";
import { getProfileList } from "./query";
import { IProfileEntry } from "../types";

export const getProfileListAPI: NextApiHandler<IProfileEntry[]> = async (
  req,
  res
) => {
  const {
    query: { lang },
  } = req;
  const profileList = await getProfileList(
    typeof lang === "string" ? lang : "de"
  );
  sendAPIResult(res, profileList);
};
