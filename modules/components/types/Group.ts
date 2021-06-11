import { HTML, IComponent, Component } from "./Component";
import { getComponentInstance } from "./utils";

export type GroupKind = "Group";

export interface IGroupComponent extends IComponent {
  kind: GroupKind;
  usage: string;
  components: Component[];
  labelText?: HTML;
}

export const isGroup = (obj: IComponent): obj is IGroupComponent =>
  obj?.kind === "Group";

export const isGroupInstance = (
  obj: IComponent,
  id: string
): obj is IGroupComponent => isGroup(obj) && obj.id === id;

export const findGroupInstance = (array: IComponent[], id: string) => {
  const group = array.filter(isGroup).find(item => item.id === id);
  return group;
};

export const getGroupInstance = (
  array: IComponent[],
  id: string,
  fallback: Omit<IGroupComponent, "kind" | "id">
) => getComponentInstance("Group", array, id, fallback);
