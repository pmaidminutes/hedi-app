import { IWithLanguageSkills } from "@/modules/model";
import { TextInputProps } from "carbon-components-react";

export interface ILanguageSkillsProps extends IWithLanguageSkills {
  headline?: Pick<
    TextInputProps,
    "id" | "labelText" | "placeholder" | "helperText" | "aria-label"
  >;
}
