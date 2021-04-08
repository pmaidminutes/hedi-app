import { IEntity, IUIElementTexts } from "@/modules/model";
import { VerticalDirection } from "carbon-components-react/typings/shared";
import { tryGet } from "@/modules/common/utils";

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
  const tooltip = tryGet("menu_language", config)?.value;
  return {
    links,
    direction,
    config,
    tooltip,
  };
}
