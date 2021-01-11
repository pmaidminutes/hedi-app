export interface IBody {
  body: string;
}

export const implementsIBody = (obj: any) => !!(obj && obj.body);

export function isIBody(obj: any): obj is IBody {
  return implementsIBody(obj);
}

export const BodyFields = `body`;
