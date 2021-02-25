export interface IEditProfileInfo {
  success? :string
  errors? : string
  profile? : IProfile
}

export interface IUpsertProfile
{
  success? :string
  error? : string
  profile? : IProfile
}

export interface IProfile{
  profile_type? : string
  prefix? : string
  forename? : string
  surname? : string
  suffix? : string
  street? : string
  house_number? : string
  city? : string
  postal_code?: string
  phone? : string
  mail? : string
  room? : string
  website? : string
  consultation_hours? : string
  first_pregnancy?: boolean
  phone_private?: string
}

