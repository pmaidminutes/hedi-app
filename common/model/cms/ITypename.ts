export interface ITypename {
  typeName: string;
}

export const implementsITypename = (obj: any) => !!(obj && obj.typeName);

export function isITypename(obj: any): obj is ITypename {
  return implementsITypename(obj);
}

export const TypenameFields = `typeName:__typename`;
