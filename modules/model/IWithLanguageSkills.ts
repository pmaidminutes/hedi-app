import { ILanguage, LanguageFields } from "./ILanguage";

export interface ILanguageSkill{
  language: ILanguage;
  level: number;
}
export interface IWithLanguageSkills {
  languageSkills: {
    language: ILanguage;
    level: number;
  }[];
}

export const WithLanguageSkillsFields = `languageSkills {
  language { ${LanguageFields} }
  level
}`;
