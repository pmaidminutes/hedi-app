import { IEntity } from "..";
import { HTML, IComponent } from "./Component";

export type SelectKind = "Select";

export interface SelectItem extends Omit<IEntity, "type"> {
  index?: number;
}

export interface Select extends IComponent {
  id: string;
  kind: SelectKind;
  items: SelectItem[];
  defaultItem?: number;
  labelText?: HTML;
  helperText?: HTML;
  size?: "sm" | "md" | "lg";
}

export const isSelect = (obj: IComponent): obj is Select =>
  obj?.kind === "Select";

export const isSelectInstance = (obj: IComponent, id: string): obj is Select =>
  isSelect(obj) && obj.id === id;

export const findSelectInstance = (array: IComponent[], id: string) => {
  const element = array.filter(isSelect).find(item => item.id === id);
  return element;
};
