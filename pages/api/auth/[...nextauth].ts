import { NextApiRequest, NextApiResponse } from "next";
import { withAuth } from "../../../modules/auth/server";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  return withAuth(req, res, true);
};
