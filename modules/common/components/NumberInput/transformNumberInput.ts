import { NumberInput } from "@/modules/model/components";
import { HTML } from "@/modules/react/html/HTML";
import { NumberInputProps } from "carbon-components-react";

export interface INumberInputProps
  extends NumberInput,
    Omit<NumberInputProps, "min" | "max" | "value" | "helperText" | "label"> {}

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
