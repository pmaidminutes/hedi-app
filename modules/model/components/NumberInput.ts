import { HTML, IComponent } from "./Component";

export type NumberInputKind = "NumberInput";

export interface NumberInput extends IComponent {
  kind: NumberInputKind;
  labelText?: HTML;
  isRequired?: boolean;
  helperText?: HTML;
  value?: number;
  min?: number;
  max?: number;
  ariaLabel?: string;
}

export const isNumberInput = (obj: IComponent): obj is NumberInput =>
  obj?.id === typeof "string" && obj?.kind === "NumberInput";

export const isNumberInputInstance = (
  obj: IComponent,
  id: string
): obj is NumberInput => isNumberInput(obj) && obj.id === id;
