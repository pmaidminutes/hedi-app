import { ILanguageSkillProps } from ".";

export function transformLanguageSkill(props: ILanguageSkillProps) {
  const { languageSkill } = props;

  return { label: languageSkill.language.label, level: languageSkill.level };
}
