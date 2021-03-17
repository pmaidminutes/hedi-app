import { getUserAuthHeader } from "@/modules/auth/server";
import { getClient, gql, GQLEndpoint } from "@/modules/graphql";
import { NextApiRequest, NextApiResponse } from "next";
import {
  EditProfileInput,
  IUpsertProfile,
  UpsertProfileFields,
} from "../types";

export async function upsertProfileQuery(
  input: EditProfileInput | null,
  req: NextApiRequest,
  res: NextApiResponse<IUpsertProfile>
): Promise<IUpsertProfile> {
  return new Promise<IUpsertProfile>(async (ok, err) => {
    const mutation = gql`
    mutation editProfile($input: UpsertProfileInput)
     {
       upsertProfile(input: $input)
       {
          ${UpsertProfileFields}
       }
    }
     `;

    const authHeader = await getUserAuthHeader(req);
    if (authHeader) {
      const gql = await getClient(GQLEndpoint.User, authHeader);
      await gql
        .request<{ upsertProfile: IUpsertProfile }>(mutation, { input })
        .then(data => {
          ok(data.upsertProfile);
        })
        .catch(e => {
          console.warn(e);
          return null;
        });
    }
  });
}
