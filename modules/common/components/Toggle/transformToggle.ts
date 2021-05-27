import { Toggle } from "@/modules/model/components";
import { HTML } from "@/modules/react/html/HTML";
import { ToggleProps } from "carbon-components-react";

export interface IToggleProps
  extends Toggle,
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
