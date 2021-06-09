import {
  findLabelInstance,
  findTextInputInstance,
  IComponent,
} from "@/modules/model/components";
import { IDetailedNameInputDefinition } from ".";

export const getDetailedNameInputDefinition = (
  components: IComponent[]
): IDetailedNameInputDefinition => ({
  detailedNameLabel: findLabelInstance(components, "detailedNameLabel")!,
  prefixTextInput: findTextInputInstance(components, "prefixTextInput")!,
  givenNameTextInput: findTextInputInstance(components, "givenNameTextInput")!,
  familyNameTextInput: findTextInputInstance(
    components,
    "familyNameTextInput"
  )!,
});
