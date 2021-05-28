import { Checkbox } from "@/modules/model/components";
import { HTML } from "@/modules/react/html/HTML";
import { CheckboxProps } from "carbon-components-react";
export interface ICheckboxProps
  extends Checkbox,
    Omit<CheckboxProps, "labelText"> {}

export function transformCheckbox(props: ICheckboxProps): CheckboxProps {
  const { kind, labelText, id, ...rest } = props;

  return { labelText: HTML({ data: labelText }) || "", id, ...rest };
}
