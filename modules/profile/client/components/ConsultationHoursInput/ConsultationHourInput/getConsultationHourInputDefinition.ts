import {
  findLabelInstance,
  getSelectInstance,
  getTextInputInstance,
  IComponent,
} from "@/modules/components";
import { IConsultationHourInputDefinition } from ".";

export const getConsultationHourInputDefinition = (
  components: IComponent[]
): IConsultationHourInputDefinition => ({
  weekdayTitle:
    findLabelInstance(components, "weekdayTitle")?.text ?? "Wochentag",
  weekdaySelect: getSelectInstance(components, "weekdaySelect", { items: [] }),
  startTimeTitle:
    findLabelInstance(components, "startTimeTitle")?.text ?? "Von",
  startTimeTextInput: getTextInputInstance(components, "startTimeTextInput", {
    type: "text",
    labelText: "Von",
  }),
  endTimeTitle: findLabelInstance(components, "endTimeTitle")?.text ?? "Bis",
  endTimeTextInput: getTextInputInstance(components, "endTimeTextInput", {
    type: "text",
    labelText: "Bis",
  }),
  availabilityTitle:
    findLabelInstance(components, "availabilityTitle")?.text ?? "Verfügbarkeit",
  availabilitySelect: getSelectInstance(components, "availabilitySelect", {
    items: [],
  }),
});
