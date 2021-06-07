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
