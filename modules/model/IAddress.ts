export interface IAddress {
  displayAddress: string;
  city: string;
  postal_code: string;
  street: string;
  house_number: string;
  room: string;
  // HACK
  // country: string;
  // state: string;
  // county: string;
  // district: string;
  // lat_approx: string; //TODO double probably ?
  // long_approx: string;
  // lat: string;
  // long: string;
}
export const implementsIAddress = (obj: any) => !!(obj && obj.type);

export function isIAddress(obj: any): obj is IAddress {
  return implementsIAddress(obj);
}

export const AddressFields = `
displayAddress
city
postal_code
street
house_number
room
`;
// HACK only for test
// state
// county
// district
// country
// lat_approx
// long_approx
// lat
// long
