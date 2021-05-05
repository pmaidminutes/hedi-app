import { HTML, IComponent, Component } from "./Component";

export type GroupKind = "Group";

export interface Group extends IComponent {
  kind: GroupKind;
  usage: string;
  components: Component[];
  labelText?: HTML;
}

export const isGroup = (obj: IComponent): obj is Group =>
  typeof obj?.id === "string" && obj?.kind === "Group";

export const isGroupInstance = (obj: IComponent, id: string): obj is Group =>
  isGroup(obj) && obj.id === id;

export const findGroupInstance = (array: IComponent[], id: string) => {
  const group = array.filter(isGroup).find(item => item.id === id);
  return group;
};
