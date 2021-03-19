import { NextApiHandler } from "next";
import { IRegisterResponse } from "../types";

export const validateRegisterAPI: NextApiHandler<IRegisterResponse> = async (
  { query },
  res
) => {
  const data = { success: query.passcode === process.env.REGISTER_VALIDATE };
  return res.send(data);
};
