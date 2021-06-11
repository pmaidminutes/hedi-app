import { HTML, IComponent } from "./Component";

export type NumberInputKind = "NumberInput";

export interface INumberInputComponent extends IComponent {
  id: string;
  kind: NumberInputKind;
  label?: HTML;
  isRequired?: boolean;
  helperText?: HTML;
  value?: number;
  min?: number;
  max?: number;
  ariaLabel?: string;
}

export const isNumberInput = (obj: IComponent): obj is INumberInputComponent =>
  obj?.kind === "NumberInput";

export const isNumberInputInstance = (
  obj: IComponent,
  id: string
): obj is INumberInputComponent => isNumberInput(obj) && obj.id === id;

export const findNumberInputInstance = (array: IComponent[], id: string) => {
  const element = array.filter(isNumberInput).find(item => item.id === id);
  return element;
};
