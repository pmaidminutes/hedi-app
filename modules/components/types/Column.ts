import { HTML, IComponent, Component } from "./Component";

export type ColumnKind = "Column";

export interface IColumnComponent extends IComponent {
  kind: ColumnKind;
  usage: string;
  components: Component[];
  labelText?: HTML;
}

export const isColumn = (obj: IComponent): obj is IColumnComponent =>
  obj?.kind === "Column";

export const isColumnInstance = (
  obj: IComponent,
  id: string
): obj is IColumnComponent => isColumn(obj) && obj.id === id;

export const findColumnInstance = (array: IComponent[], id: string) => {
  const column = array.filter(isColumn).find(item => item.id === id);
  return column || null;
};
