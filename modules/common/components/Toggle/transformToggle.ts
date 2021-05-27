import { Toggle } from "@/modules/model/components";
import { HTML } from "@/modules/react/html/HTML";
import { ToggleProps } from "carbon-components-react";

export interface IToggleProps
  extends Toggle,
    Omit<ToggleProps, "labelText" | "labelA" | "labelB"> {}

export function transformToggle(props: IToggleProps) {
  const { kind, ariaLabel, labelA, labelText, labelB, ...rest } = props;

  return {
    labelText: HTML({ data: labelText }),
    labelA: HTML({ data: labelA }),
    labelB: HTML({ data: labelB }),
    "aria-label": ariaLabel,
    ...rest,
  };
}
