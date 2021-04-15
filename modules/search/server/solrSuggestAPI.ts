/**
 * this api path doesn't really make sense
 * but is just here for demo and setting the root folder
 *
 * nest language specific calls into this folder
 */
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { suggestServer } from "./request";

const solrSuggestAPI: NextApiHandler<any> = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const {
    query: { typeText },
  } = req;
  const jsonResponse = await suggestServer(`${typeText}`);
  res.send(jsonResponse);
};
export default solrSuggestAPI;
