export interface ILocation {
  lat: string;
  long: string;
  name: string;
}

export function isILocation(obj: any): obj is ILocation {
  return obj && obj.typeName === "Location";
}
