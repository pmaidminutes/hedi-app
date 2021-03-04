import { IProfile } from "@/modules/model/IProfile";
import { NextApiHandler } from "next";
import { fetchProfile, saveProfile } from "../query";
import { IEditProfileResponse } from "../types";

export const editProfileAPI: NextApiHandler<IEditProfileResponse> = async (
  req,
  res
) => {
  if (req.body) {
    const query = JSON.parse(req.body);
    type typeInputData = Omit<
      IProfile,
      | "county"
      | "displayAddress"
      | "displayName"
      | "district"
      | "lat"
      | "lat_approx"
      | "long"
      | "long_approx"
      | "profile_type"
      | "state"
      | "country"
    >;
    const newData: typeInputData = {
      street: query?.street,
      forename: query?.forename,
      surname: query?.surname,
      city: query?.city,
      house_number: query?.house_number,
      mail: query?.mail,
      phone: query?.phone,
      postal_code: query?.postal_code,
      prefix: query?.prefix,
      suffix: query?.suffix,
      phone_private: query?.phone_private,
      consultation_hours: query?.consultation_hours,
      website: query?.website,
      room: query?.room,
      first_pregnancy: query?.first_pregnancy,
    };
    await saveProfile(newData, req, res)
      .then(resp => res.status(200).json(resp))
      .catch(err => res.status(500).json({ success: false }));
  } else
    await fetchProfile(req, res)
      .then(resp => res.status(200).json(resp))
      .catch(err => res.status(500).json({ success: false }));
};
