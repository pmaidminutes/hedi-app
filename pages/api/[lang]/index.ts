/**
 * this api path doesn't really make sense
 * but is just here for demo and setting the root folder
 *
 * nest language specific calls into this folder
 */

import { NextApiRequest, NextApiResponse } from "next";

export default (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { lang },
  } = req;
  // ...
};
