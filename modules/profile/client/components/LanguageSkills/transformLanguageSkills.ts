import { IWithLanguageSkills } from "@/modules/model";
import { TextInputProps } from "carbon-components-react";
export interface ILanguageSkillsProps extends IWithLanguageSkills {
  headline?: Pick<
    TextInputProps,
    "id" | "labelText" | "placeholder" | "helperText" | "aria-label"
  >;
}

export function transfromLanguageSkills(props: ILanguageSkillsProps) {
  const { languageSkills, headline } = props;

  return { languageSkills, headline: headline?.labelText };
}
