/**
 * this api path doesn't really make sense
 * but is just here for demo and setting the root folder
 *
 * nest language specific calls into this folder
 */

import { suggestServer } from "../request";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

const solrSuggestAPI: NextApiHandler<any> = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const {
    query: { lang, typeText },
  } = req;
  const jsonResponse = await suggestServer(`${lang}`, `${typeText}`);
  res.send(jsonResponse);
};
export default solrSuggestAPI;
