import { sendAPIResult } from "@/modules/common/utils";
import { NextApiHandler } from "next";
import { registerQuery } from "../query";
import { IRegisterResponse } from "../types";

export const registerAPI: NextApiHandler<IRegisterResponse> = async (
  { query },
  res
) => {
  const name = Array.isArray(query?.name) ? query.name[0] : query?.name;
  //const mail = Array.isArray(query?.mail) ? query.mail[0] : query?.mail;
  const pass = Array.isArray(query?.pass) ? query.pass[0] : query?.pass;
  const lang = Array.isArray(query?.lang) ? query.lang[0] : query?.lang;
  const commit = !!(Array.isArray(query?.commit)
    ? query.commit[0]
    : query?.commit);
  const response = await registerQuery({ name, pass, lang, commit });
  sendAPIResult(res, response);
};
