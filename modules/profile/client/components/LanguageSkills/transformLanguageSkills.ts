import { ILanguageSkillsProps } from ".";

export function transfromLanguageSkills(props: ILanguageSkillsProps) {
  const { languageSkills, headline } = props;

  return { languageSkills, headline: headline?.labelText };
}
