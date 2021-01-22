export interface IDetailedName {
  display: string;
  prefix: string;
  name: string;
  surname: string;
  suffix: string;
}
export const implementsIDetailedName = (obj: any) => !!(obj && obj.type);

export function isIDetailedName(obj: any): obj is IDetailedName {
  return implementsIDetailedName(obj);
}

export const DetailedNameFields = `
display
prefix
name
surname
suffix`;
