import { INumberInputComponent } from "../../../types";
import { HTML } from "@/modules/react/html/HTML";
import { NumberInputProps } from "carbon-components-react";
import { PartialBy } from "@/modules/common/utils";

export type INumberInputProps = PartialBy<INumberInputComponent, "kind"> &
  Omit<NumberInputProps, "min" | "max" | "value" | "helperText" | "label">;

export function transformNumberInput(
  props: INumberInputProps
): NumberInputProps {
  const { helperText, label, kind, value, ...rest } = props;
  return {
    helperText: HTML({ data: helperText }),
    label: HTML({ data: label }),
    value: value || "",
    ...rest,
  };
}
