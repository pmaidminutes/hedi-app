import { sendAPISuccess } from "@/modules/common/utils";
import { NextApiHandler } from "next";
import { IRegisterResponse } from "@/modules/auth/types";

export const validateRegisterAPI: NextApiHandler<IRegisterResponse> = async (
  { query },
  res
) => {
  const validPasccode: boolean =
    query.registrationcode === process.env.REGISTER_VALIDATE;
  const data = validPasccode
    ? { success: true }
    : { success: false, errors: { registrationcode: "invalid_passcode" } };
  sendAPISuccess(res, data);
};
