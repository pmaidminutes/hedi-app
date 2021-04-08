export interface IDetailedName {
  displayName: string;
  prefix: string;
  forename: string;
  surname: string;
  suffix: string;
}
export const implementsIDetailedName = (obj: any) => !!(obj && obj.type);

// UNUSED
export function isIDetailedName(obj: any): obj is IDetailedName {
  return implementsIDetailedName(obj);
}

export const DetailedNameFields = `
displayName
prefix
forename
surname
suffix`;
