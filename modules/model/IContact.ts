export interface IContact {
  phone: string;
  phone_private: string;
  mail: string;
  website: string;
  consultation_hours: string;
}
export const implementsIContact = (obj: any) => !!(obj && obj.type);

export function isIContact(obj: any): obj is IContact {
  return implementsIContact(obj);
}

export const ContactFields = `
  phone
  phone_private
  mail
  website
  consultation_hours`;
