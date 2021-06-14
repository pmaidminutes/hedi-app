import { ICheckboxComponent } from "../../../types";
import { HTML } from "@/modules/react/html/HTML";
import { CheckboxProps } from "carbon-components-react";
import { PartialBy } from "@/modules/common/utils";

export type ICheckboxProps = PartialBy<ICheckboxComponent, "kind"> &
  Omit<CheckboxProps, "labelText">;

export function transformCheckbox(props: ICheckboxProps): CheckboxProps {
  const { kind, labelText, id, ...rest } = props;

  return { labelText: HTML({ data: labelText }) || "", id, ...rest };
}
