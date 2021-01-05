export interface ITyped {
  type: string;
}

export const implementsITyped = (obj: any) => !!(obj && obj.type);

export function isITyped(obj: any): obj is ITyped {
  return implementsITyped(obj);
}

export const TypedFields = `type:__typename`;
