import { IEntity } from "../../model";
import { HTML, IComponent } from "./Component";
import { findComponentInstance, getComponentInstance } from "./utils";

export type SelectKind = "Select";

export interface SelectOptions extends Omit<IEntity, "type"> {
  index?: number;
}

export interface ISelectComponent extends IComponent {
  id: string;
  kind: SelectKind;
  items: SelectOptions[];
  defaultItem?: number;
  labelText?: HTML;
  helperText?: HTML;
  size?: "sm" | "md" | "lg";
}

export const isSelect = (obj: IComponent): obj is ISelectComponent =>
  obj?.kind === "Select";

export const isSelectInstance = (
  obj: IComponent,
  id: string
): obj is ISelectComponent => isSelect(obj) && obj.id === id;

export const findSelectInstance = (array: IComponent[], id: string) =>
  findComponentInstance<ISelectComponent>("Select", array, id);

export const getSelectInstance = (
  array: IComponent[],
  id: string,
  fallback: Omit<ISelectComponent, "kind" | "id">
) => getComponentInstance("Select", array, id, fallback);
