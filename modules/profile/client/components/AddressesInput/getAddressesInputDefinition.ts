import {
  findButtonInstance,
  findLabelInstance,
  IComponent,
} from "@/modules/model/components";
import { IAddressesInputDefinition } from ".";
import { getAddressInputDefinition } from "./AddressInput";

export const getAddressesInputDefinition = (
  components: IComponent[]
): IAddressesInputDefinition => ({
  addressInputDefinition: getAddressInputDefinition(components),
  addressesLabel: findLabelInstance(components, "addressLabel")!,
  addButton: findButtonInstance(components, "addButton")!,
  removeButton: findButtonInstance(components, "removeButton")!,
});
