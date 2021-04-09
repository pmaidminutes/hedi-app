import { IEntity, IUIElementTexts } from "@/modules/model";
import { VerticalDirection } from "carbon-components-react/typings/shared";
import { getUIElement } from "@/modules/common/utils";

export interface ILanguageSwitchProps {
  direction?: VerticalDirection;
  links: IEntity[];
  config?: IUIElementTexts[];
}
export function transformLanguageSwitch({
  links,
  config,
  direction = "bottom",
}: ILanguageSwitchProps) {
  const tooltip = getUIElement("menu_language", config)?.value;
  return {
    links,
    direction,
    config,
    tooltip,
  };
}
