import { IEntity, IUIElementTexts } from "@/modules/model";
import { VerticalDirection } from "carbon-components-react/typings/shared";

export interface ILanguageSwitchProps {
  direction?: VerticalDirection;
  links: IEntity[];
  shellConfigs?: IUIElementTexts[];
}
export function useLanguageSwitch({
  links,
  shellConfigs,
  direction = "bottom",
}: ILanguageSwitchProps) {
  return {
    links,
    direction,
    shellConfigs,
  };
}
