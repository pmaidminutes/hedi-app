import { IEntity, IUIElementTexts } from "@/modules/model";
import { VerticalDirection } from "carbon-components-react/typings/shared";

export interface ILanguageSwitchProps {
  direction?: VerticalDirection;
  links: IEntity[];
  config?: IUIElementTexts[];
}
export function useLanguageSwitch({
  links,
  config,
  direction = "bottom",
}: ILanguageSwitchProps) {
  return {
    links,
    direction,
    config,
  };
}
