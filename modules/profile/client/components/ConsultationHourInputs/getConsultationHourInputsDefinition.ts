import { findButtonInstance, IComponent } from "@/modules/model/components";
import { IConsultationHourInputsDefinition } from ".";
import { getConsultationHourInputDefinition } from "./ConsultationHourInput";

export const getConsultationHourInputsDefinition = (
  components: IComponent[]
): IConsultationHourInputsDefinition => {
  const consultationHourInputDefinition = getConsultationHourInputDefinition(
    components
  );
  return {
    weekdayTitle: consultationHourInputDefinition.weekdayTitle,
    startTimeTitle: consultationHourInputDefinition.startTimeTitle,
    endTimeTitle: consultationHourInputDefinition.endTimeTitle,
    availabilityTitle: consultationHourInputDefinition.availabilityTitle,
    addButton: findButtonInstance(components, "addButton")!,
    consultationHourInputDefinition,
  };
};
