
export interface IEditProfileLabels {
  type: string,
  key: string,
  route: string,
  label: string,
  lang: string,
  translations: ITranslations[],
  texts: IAllLabels
}


export interface ITranslations {
  type: string, 
  route: string, 
  label: string, 
  lang: string 
}


export interface IAllLabels{
  profile_type?: string;
  prefix?: string;
  forename?: string;
  surname?: string;
  suffix?: string;
  street?: string;
  house_number?: string;
  city?: string;
  postal_code?: string;
  phone?: string;
  mail?: string;
  room?: string;
  website?: string;
  consultation_hours?: string;
  first_pregnancy?:boolean;
  phone_private?: string;
}
