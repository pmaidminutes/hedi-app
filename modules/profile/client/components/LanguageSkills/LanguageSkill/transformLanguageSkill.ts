import { ILanguageSkill } from "@/modules/model";

export function transformLanguageSkill(props: {
  languageSkill: ILanguageSkill;
}) {
  const { languageSkill } = props;

  return { label: languageSkill.language.label, level: languageSkill.level };
}
