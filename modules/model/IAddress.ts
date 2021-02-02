export interface IAddress {
  displayAddress: string;
  country: string;
  state: string;
  county: string;
  city: string;
  district: string;
  postal_code: string;
  street: string;
  house_number: string;
  room: string;
  lat_approx: string; //TODO double probably ?
  long_approx: string;
  lat: string;
  long: string;
}
export const implementsIAddress = (obj: any) => !!(obj && obj.type);

export function isIAddress(obj: any): obj is IAddress {
  return implementsIAddress(obj);
}

export const AddressFields = `
displayAddress
country
state
county
city
district
postal_code
street
house_number
room
lat_approx
long_approx
lat
long`;
