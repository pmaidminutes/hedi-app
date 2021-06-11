import { IEntity } from "@/modules/model";
import { VerticalDirection } from "carbon-components-react/typings/shared";
import { findLabelInstance, IComponent } from "@/modules/components/types";

export interface ILanguageSwitchProps {
  direction?: VerticalDirection;
  links: IEntity[];
  config?: IComponent[];
}
export function transformLanguageSwitch({
  links,
  config,
  direction = "bottom",
}: ILanguageSwitchProps) {
  const tooltip = config ? findLabelInstance(config, "menu_language") : null;
  return {
    links,
    direction,
    config,
    tooltip: tooltip?.text || "MISSING TOOOLTIP",
  };
}
