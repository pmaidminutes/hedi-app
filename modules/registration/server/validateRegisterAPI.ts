import { NextApiHandler } from "next";
import { IRegisterResponse } from "../types";

export const validateRegisterAPI: NextApiHandler<IRegisterResponse> = async (
  { query },
  res
) => {
  const validPasccode: boolean =
    query.registrationcode === process.env.REGISTER_VALIDATE;
  const data = validPasccode
    ? { success: true }
    : { success: false, errors: { registrationcode: "invalid_passcode" } };
  return res.send(data);
};
