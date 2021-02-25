import { getUserAuthHeader } from "@/modules/auth/server";
import { getClient, gql, GQLEndpoint } from "@/modules/graphql";
import {  UpsertProfileFields } from "@/modules/model";
import { GraphQLError } from "graphql-request/dist/types";
import {  NextApiRequest, NextApiResponse } from "next";
import {IEditProfileInfo, IEditProfileRequest, IEditProfileResponse,IProfile} from "../types";

export async function SaveProfile(
  data: IProfile,
  req: NextApiRequest,
  res :NextApiResponse<IEditProfileResponse> 

): Promise<IEditProfileResponse> {
   return mutateProfile(data, req, res);
}

export async function FetchProfile(
  req: NextApiRequest,
  res :NextApiResponse<IEditProfileResponse> 

): Promise<IEditProfileResponse> {
   return mutateProfile({}, req, res);
}

async function mutateProfile(
  data: IProfile,
  req: NextApiRequest,
  res :NextApiResponse<IEditProfileResponse> 
): Promise<IEditProfileResponse> {
  return new Promise<IEditProfileResponse>(async (ok, err) => {
    const mutation = gql`
    mutation EditProfile($input: UpsertProfileInput)
     {
       upsertProfile(input: $input)
       {
           ${UpsertProfileFields}
       }
    }
     `;
    const authHeader = await getUserAuthHeader(req);
    if(authHeader)
    {
      const gql = await getClient(GQLEndpoint.User, authHeader);
      await gql.rawRequest<{upsertProfile:{profile: IProfile}}>(
          mutation
        , {"input": data }
      ).then(data => {
        if (data?.errors){
          err(data?.errors);
        }else{
          ok({ profile: data.data?.upsertProfile?.profile } as IEditProfileResponse);
        }
  
        
      })
      .catch(e => {
        console.warn(e);
        err(e);
      });
     }
  })
  
}