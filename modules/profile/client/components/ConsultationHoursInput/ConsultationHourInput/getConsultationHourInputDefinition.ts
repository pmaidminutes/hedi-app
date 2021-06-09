import {
  findLabelInstance,
  findSelectInstance,
  findTextInputInstance,
  IComponent,
} from "@/modules/model/components";
import { IConsultationHourInputDefinition } from ".";

export const getConsultationHourInputDefinition = (
  components: IComponent[]
): IConsultationHourInputDefinition => ({
  weekdayTitle:
    findLabelInstance(components, "weekdayTitle")?.text ?? "Wochentag",
  weekdaySelect: findSelectInstance(components, "weekdaySelect")!,
  startTimeTitle:
    findLabelInstance(components, "startTimeTitle")?.text ?? "Von",
  startTimeTextInput: findTextInputInstance(components, "startTimeTextInput")!,
  endTimeTitle: findLabelInstance(components, "endTimeTitle")?.text ?? "Bis",
  endTimeTextInput: findTextInputInstance(components, "endTimeTextInput")!,
  availabilityTitle:
    findLabelInstance(components, "availabilityTitle")?.text ?? "Verfügbarkeit",
  availabilitySelect: findSelectInstance(components, "availabilitySelect")!,
});
