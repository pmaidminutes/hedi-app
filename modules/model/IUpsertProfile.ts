export interface IUpsertProfile {
  profile: {
      [key: string]: string;
    };
  }
  
  export const implementsIUpsertProfile = (obj: any) => !!(obj && obj.profile);
  
  export function isIUpsertProfile(obj: any): obj is IUpsertProfile {
    return implementsIUpsertProfile(obj);
  }
  
  export const UpsertProfileFields = ` 
  profile {
    consultation_hours
    first_pregnancy
    city
    forename
    house_number
    mail
    phone
    phone_private
    postal_code
    prefix
    profile_type
    room
    street
    suffix
    surname
    website
  }
   `;

  