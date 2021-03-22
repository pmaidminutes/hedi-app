import { NextApiHandler } from "next";
import { IRegisterResponse } from "../types";

export const validateRegisterAPI: NextApiHandler<IRegisterResponse> = async (
  { query },
  res
) => {
  const validPasccode: boolean =
    query.passcode === process.env.REGISTER_VALIDATE;
  const data = validPasccode
    ? { success: true }
    : { success: false, errors: { passcode: "Invalid passcode" } };
  return res.send(data);
};
