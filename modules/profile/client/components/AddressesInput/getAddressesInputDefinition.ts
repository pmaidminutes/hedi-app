import {
  findButtonInstance,
  findLabelInstance,
  IComponent,
} from "@/modules/components/types";
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
