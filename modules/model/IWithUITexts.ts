export interface IWithUITexts {
  texts: {
    [key: string]: string;
  };
}

export const implementsIWithUITexts = (obj: any) => !!(obj && obj.texts);

// UNUSED
export function isIWithUITexts(obj: any): obj is IWithUITexts {
  return implementsIWithUITexts(obj);
}

export const WithUITextsFields = `texts`;
