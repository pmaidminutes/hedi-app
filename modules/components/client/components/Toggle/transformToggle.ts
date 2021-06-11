import { IToggleComponent } from "../../../types";
import { ToggleProps } from "carbon-components-react";

export interface IToggleProps
  extends IToggleComponent,
    Omit<ToggleProps, "labelText" | "labelA" | "labelB"> {}

export function transformToggle(props: IToggleProps): ToggleProps {
  const { kind, ariaLabel, labelA, labelText, labelB, ...rest } = props;

  return {
    labelText,
    labelA,
    labelB,
    "aria-label": ariaLabel,
    ...rest,
  };
}
