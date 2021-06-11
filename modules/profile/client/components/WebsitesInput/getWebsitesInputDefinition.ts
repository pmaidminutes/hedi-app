import {
  getButtonInstance,
  getLabelInstance,
  IComponent,
} from "@/modules/components";
import { IWebsitesInputDefinition } from ".";
import { getWebsiteInputDefinition } from "./WebsiteInput";

export const getWebsitesInputDefinition = (
  components: IComponent[]
): IWebsitesInputDefinition => ({
  websiteInputDefinition: getWebsiteInputDefinition(components),
  websitesLabel: getLabelInstance(components, "websitesLabel", {
    labelKind: "span",
    text: "Webseiten",
  }),
  addButton: getButtonInstance(components, "addButton", {
    buttonKind: "primary",
    usage: "",
    text: "Webseite hinzufügen",
  }),
  removeButton: getButtonInstance(components, "removeButton", {
    buttonKind: "primary",
    usage: "",
    text: "Webseite entfernen",
  }),
});
