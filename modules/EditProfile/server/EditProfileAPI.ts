import { profile } from "console";
import { NextApiHandler } from "next";
import { FetchProfile, SaveProfile } from "../query";
import { IEditProfileRequest, IEditProfileResponse, IProfile } from "../types";

export const EditProfileAPI: NextApiHandler<IEditProfileResponse> = async (
  req,
  res
) => {

  let newData : IProfile  =  {}; 
    if(req.body){
      const query = JSON.parse(req.body);
      const street = Array.isArray(query?.street) ? query.street[0] : query?.street;
      const forename = Array.isArray(query?.forename) ? query.forename[0] : query?.forename;
      const surname = Array.isArray(query?.surname) ? query.surname[0] : query?.surname;
      const city = Array.isArray(query?.city) ? query.city[0] : query?.city;
      const house_number = Array.isArray(query?.house_number) ? query.house_number[0] : query?.house_number;
      const mail = Array.isArray(query?.mail) ? query.mail[0] : query?.mail;
      const phone = Array.isArray(query?.phone) ? query.phone[0] : query?.phone;
      const postal_code = Array.isArray(query?.postal_code) ? query.postal_code[0] : query?.postal_code;
      const prefix = Array.isArray(query?.prefix) ? query.prefix[0] : query?.prefix;
      const suffix = Array.isArray(query?.suffix) ? query.suffix[0] : query?.suffix;
      const first_pregnancy = Array.isArray(query?.first_pregnancy) ? query.first_pregnancy[0] : query?.first_pregnancy;
      const room = Array.isArray(query?.room) ? query.room[0] : query?.room;
      const website = Array.isArray(query?.website) ? query.website[0] : query?.website;
      const consultation_hours = Array.isArray(query?.consultation_hours) ? query.consultation_hours[0] : query?.consultation_hours;
      const phone_private = Array.isArray(query?.phone_private) ? query.phone_private[0] : query?.phone_private;
      
        
      newData  = {
        street : street,
        forename : forename,
        surname :surname,
        city : city,
        house_number : house_number,
        mail : mail,
        phone : phone,
        postal_code :postal_code,
        prefix : prefix,
        suffix :suffix,
        phone_private : phone_private,
        consultation_hours :consultation_hours,
        website : website,
        room : room,
        first_pregnancy :first_pregnancy
    };
  }
  let response: IEditProfileResponse | null = null; 
  if(req.body)
    await SaveProfile(newData, req, res)
      .then(resp => res.status(200).json(resp))
      .catch(err => res.status(500).json({ success: false }));
  else
    await FetchProfile(req, res)
      .then(resp => res.status(200).json(resp))
      .catch(err => res.status(500).json({ success: false }));

};
