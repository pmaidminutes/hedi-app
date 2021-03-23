import { ILanguageSkill } from "@/modules/model";

export interface ILanguageSkillProps {
  languageSkill: ILanguageSkill;
}
export function useLanguageSkill(props: ILanguageSkillProps) {
  const { languageSkill } = props;

  return { label: languageSkill.language.label, level: languageSkill.level };
}
