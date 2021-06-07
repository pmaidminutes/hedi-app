import {
  findButtonInstance,
  findLabelInstance,
  findSelectInstance,
  findTextInputInstance,
  IComponent,
} from "@/modules/model/components";
import { IConsultationHourInputDefinition } from ".";

export const getConsultationHourInputDefinition = (
  components: IComponent[]
): IConsultationHourInputDefinition => ({
  weekdayTitle: findLabelInstance(components, "weekdayTitle")?.text,
  weekdaySelect: findSelectInstance(components, "weekdaySelect")!,
  startTimeTitle: findLabelInstance(components, "startTimeTitle")?.text,
  startTimeTextInput: findTextInputInstance(components, "startTimeTextInput")!,
  endTimeTitle: findLabelInstance(components, "endTimeTitle")?.text,
  endTimeTextInput: findTextInputInstance(components, "endTimeTextInput")!,
  availabilityTitle: findLabelInstance(components, "availabilityTitle")?.text,
  availabilitySelect: findSelectInstance(components, "availabilitySelect")!,
  removeButton: findButtonInstance(components, "removeButton")!,
});
