export interface ILanguageLevel {
  langcode: string;
  level: number;
}

export const LanguageLevelFields = `
langcode
level
`;

export interface ILanguageLevelInput {
  langcode: string;
  level: number;
}

export function languageLevelToInput(
  languageLevel: ILanguageLevel
): ILanguageLevelInput {
  // NOTE will change, since ILanguageLevel is just a temporary model until we have the language list
  return languageLevel;
}
