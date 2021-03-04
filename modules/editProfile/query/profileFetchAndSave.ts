import { getUserAuthHeader } from "@/modules/auth/server";
import { getClient, gql, GQLEndpoint } from "@/modules/graphql";
import { IProfile } from "@/modules/model/IProfile";
import { NextApiRequest, NextApiResponse } from "next";
import { IEditProfileResponse } from "../types";
import { IUpsertProfile, UpsertProfileFields } from "../types/IUpsertProfile";

export async function saveProfile(
  data: any,
  req: NextApiRequest,
  res: NextApiResponse<IEditProfileResponse>
): Promise<IEditProfileResponse> {
  return mutateProfile(data, req, res);
}

export async function fetchProfile(
  req: NextApiRequest,
  res: NextApiResponse<IEditProfileResponse>
): Promise<IEditProfileResponse> {
  return mutateProfile({} as IProfile, req, res);
}

const mapIProfileToIUpsertProfile: (
  data: IProfile
) => IUpsertProfile = function (data): IUpsertProfile {
  return {
    consultation_hours: data.consultation_hours,
    first_pregnancy: data.first_pregnancy,
    city: data.city,
    forename: data.forename,
    house_number: data.house_number,
    mail: data.mail,
    phone: data.phone,
    phone_private: data.phone_private,
    postal_code: data.postal_code,
    prefix: data.prefix,
    profile_type: data.profile_type,
    room: data.room,
    street: data.street,
    suffix: data.suffix,
    surname: data.surname,
    website: data.website,
  };
};

async function mutateProfile(
  data: IProfile,
  req: NextApiRequest,
  res: NextApiResponse<IEditProfileResponse>
): Promise<IEditProfileResponse> {
  return new Promise<IEditProfileResponse>(async (ok, err) => {
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
        .rawRequest<{ upsertProfile: { profile: IProfile } }>(mutation, {
          input: mapIProfileToIUpsertProfile(data),
        })
        .then(data => {
          if (data?.errors) {
            err(data?.errors);
          } else {
            ok({
              profile: data.data?.upsertProfile.profile,
              success: true,
            } as IEditProfileResponse);
          }
        })
        .catch(e => {
          console.warn(e);
          err(e);
        });
    }
  });
}
