export interface IEditProfile {
  type: string,
  route: string,
  label: string,
  lang: string,
  translations: ITranslations[],
  texts: IText
}


export interface ITranslations {
  type: string, 
  route: string, 
  label: string, 
  lang: string 
}


export interface IText{
  profile_type: string;
  prefix: string;
  forename: string;
  surname: string;
  suffix: string;
  street: string;
  house_number: string;
  city: string;
  postal_code: string;
  phone: string;
  mail: string;
}

export const implementsIEditProfiles = (obj: any) => !!(obj && obj.type);

export function isIEditProfiles(obj: any): obj is IEditProfile {
  return implementsIEditProfiles(obj);
}

export const EditFields = `
type;
route;
label;
lang;
translations: [ { type, route, label, lang } ];
  texts: {
  profile_type;
  prefix;
  forename;
  surname;
  suffix;
  street;
  house_number;
  city;
  postal_code;
  phone;
  mail;
  }
`;
