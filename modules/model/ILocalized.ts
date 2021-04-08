export interface ILocalized {
  lang: string;
}

export const implementsILocalized = (obj: any) => !!(obj && obj.lang);

// UNUSED
export function isILocalized(obj: any): obj is ILocalized {
  return implementsILocalized(obj);
}

export const LocalizedFields = `lang`;
