import { ComponentKind, IComponent } from "./Component";

export function isComponentInstance<T extends IComponent>(
  kind: ComponentKind,
  obj: IComponent,
  id: string
): obj is T {
  return obj.kind === kind && obj.id === id;
}

export function findComponentInstance<T extends IComponent>(
  kind: ComponentKind,
  array: IComponent[],
  id: string
): T | undefined {
  return array.find(item => isComponentInstance(kind, item, id)) as
    | T
    | undefined;
}

export function getComponentInstance<T extends IComponent>(
  kind: ComponentKind,
  array: IComponent[],
  id: string,
  fallback: Omit<T, "kind" | "id">
): T {
  const element = findComponentInstance(kind, array, id);
  if (element) return element as T;
  else {
    console.warn(`${kind}Component[${id}] not found, resorting to fallback`);
    return {
      kind,
      id,
      ...fallback,
    } as T;
  }
}
