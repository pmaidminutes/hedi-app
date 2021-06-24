import {
  findLabelInstance,
  findLinkInstance,
  IComponent,
} from "@/modules/components";

export function transformGlossaryComponents(components: IComponent[]) {
  const jumpComponent = findLabelInstance(components, "jumpLinks");
  const groupAlphabetLinks = findLinkInstance(components, "groupAlphabet");
  return { jumpComponent, groupAlphabetLinks };
}
