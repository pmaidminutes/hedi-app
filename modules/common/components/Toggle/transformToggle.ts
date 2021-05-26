import { Toggle } from "@/modules/model/components";
import { ToggleProps } from "carbon-components-react";

export interface IToggleProps extends Toggle, Omit<ToggleProps, "labelText"> {}

export function transformToggle(props: IToggleProps): ToggleProps {
  const { kind, ariaLabel, ...rest } = props;

  return { "aria-label": ariaLabel, ...rest };
}
