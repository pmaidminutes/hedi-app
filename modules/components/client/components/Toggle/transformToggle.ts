import { IToggleComponent } from "../../../types";
import { ToggleProps } from "carbon-components-react";
import { PartialBy } from "@/modules/common/utils";

export type IToggleProps = PartialBy<IToggleComponent, "kind"> &
  Omit<ToggleProps, "labelText" | "labelA" | "labelB">;

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
