import {
  findButtonInstance,
  findLabelInstance,
  IComponent,
} from "@/modules/model/components";
import { IWebsitesInputDefinition } from ".";
import { getWebsiteInputDefinition } from "./WebsiteInput";

export const getWebsitesInputDefinition = (
  components: IComponent[]
): IWebsitesInputDefinition => ({
  websiteInputDefinition: getWebsiteInputDefinition(components),
  websitesLabel: findLabelInstance(components, "websitesLabel")!,
  addButton: findButtonInstance(components, "addButton")!,
  removeButton: findButtonInstance(components, "removeButton")!,
});
