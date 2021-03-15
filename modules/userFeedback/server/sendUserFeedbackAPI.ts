import { getUserAuthHeader } from "@/modules/auth/server";
import { getClient, gql, GQLEndpoint } from "@/modules/graphql";
import { IMutationResponse } from "@/modules/model/IMutationResponse";
import { NextApiHandler } from "next";
import { IUserFeedbackInfo } from "../types/IUserFeedbackInfo";

export const sendUserFeedbackAPI: NextApiHandler<IMutationResponse> = async (
  req,
  res
) => {
  if (!req.body) {
    res
      .status(500)
      .json({ success: false, errors: { generic: "no entity to save" } }); // TODO: how to return error (raw / translated)
    return;
  }

  const query = JSON.parse(req.body);
  const userfeedback: IUserFeedbackInfo = {
    body: query?.body,
    metadata: query?.metadata,
    label: query?.label,
  };

  let mutationRequest = gql`
    mutation sendUserFeedback($input: InsertUserFeedbackInput!) {
      insertUserFeedback(input: $input) {
        success
        errors
      }
    }
  `;

  const authHeader = await getUserAuthHeader(req);
  if (!authHeader) {
    res
      .status(500)
      .json({ success: false, errors: { generic: "NOT AUTHORIZED" } }); // TODO: error text / handling
    return;
  }
  const client = await getClient(GQLEndpoint.User, authHeader);
  return client
    .rawRequest<{ insertUserFeedback: IMutationResponse }>(mutationRequest, {
      input: {
        label: userfeedback.label,
        body: userfeedback.body,
        metadata: userfeedback.metadata,
      },
    })
    .then((data: any) => {
      res.status(200).json(data.data.insertUserFeedback);
    })
    .catch((err: any) => {
      console.warn(err);
      res.status(500).json({ success: false, errors: err }); // TODO: check if error. could it be like: errors: {generic: err}
    });
};
