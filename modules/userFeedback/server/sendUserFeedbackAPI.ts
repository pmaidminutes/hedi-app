import { getUserAuthHeader } from "@/modules/auth/server";
import { IMutationResponse } from "@/modules/model/IMutationResponse";
import { GetServerSideProps, NextApiHandler } from "next";
import { useRouter } from "next/router";
import { insertUserFeedback } from "../query";
import { UserFeedbackInput } from "../types";

export const sendUserFeedbackAPI: NextApiHandler<IMutationResponse> = async (
  req,
  res
) => {
  if (!req.body) {
    res
      .status(400)
      .json({ success: false, errors: { generic: "no entity to save" } }); // TODO: how to return error (raw / translated)
    return;
  }

  const userfeedback = JSON.parse(req.body) as UserFeedbackInput;

  const authHeader = await getUserAuthHeader(req);
  if (!authHeader) {
    res
      .status(401)
      .json({ success: false, errors: { generic: "Unauthorized" } }); // TODO: error text / handling
    return;
  }

  // TODO get user locale. useRouter() causes hook error. req.headers["accept-language"] gives unprocessed languages

  const mutationResult = await insertUserFeedback(authHeader, userfeedback);
  if (mutationResult) res.status(200).json(mutationResult);
  else res.status(500).json({ success: false, errors: {} });
};
