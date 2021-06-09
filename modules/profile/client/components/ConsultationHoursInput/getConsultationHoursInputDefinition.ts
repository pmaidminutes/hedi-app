import {
  findButtonInstance,
  findLabelInstance,
  IComponent,
} from "@/modules/model/components";
import { IConsultationHoursInputDefinition } from ".";
import { getConsultationHourInputDefinition } from "./ConsultationHourInput";

export const getConsultationHoursInputDefinition = (
  components: IComponent[]
): IConsultationHoursInputDefinition => {
  const consultationHourInputDefinition = getConsultationHourInputDefinition(
    components
  );
  return {
    consultationHoursLabel: findLabelInstance(
      components,
      "consultationHoursLabel"
    )!,
    weekdayTitle: consultationHourInputDefinition.weekdayTitle,
    startTimeTitle: consultationHourInputDefinition.startTimeTitle,
    endTimeTitle: consultationHourInputDefinition.endTimeTitle,
    availabilityTitle: consultationHourInputDefinition.availabilityTitle,
    consultationHourInputDefinition,
    addButton: findButtonInstance(components, "addButton")!,
    removeButton: findButtonInstance(components, "removeButton")!,
  };
};
