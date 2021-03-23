import { IEntity } from "@/modules/model";
import { VerticalDirection } from "carbon-components-react/typings/shared";

export interface ILanguageSwitchProps {
  direction?: VerticalDirection;
  links: IEntity[];
}
export function useLanguageSwitch({
  links,
  direction = "bottom",
}: ILanguageSwitchProps) {
  return {
    links,
    direction,
  };
}
