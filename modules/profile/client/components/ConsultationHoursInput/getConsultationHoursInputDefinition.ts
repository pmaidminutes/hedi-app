import {
  getButtonInstance,
  getLabelInstance,
  IComponent,
} from "@/modules/components";
import { IConsultationHoursInputDefinition } from ".";
import { getConsultationHourInputDefinition } from "./ConsultationHourInput";

export const getConsultationHoursInputDefinition = (
  components: IComponent[]
): IConsultationHoursInputDefinition => {
  const consultationHourInputDefinition = getConsultationHourInputDefinition(
    components
  );
  return {
    consultationHoursLabel: getLabelInstance(
      components,
      "consultationHoursLabel",
      { labelKind: "span", text: "Erreichbarkeit" }
    )!,
    weekdayTitle: consultationHourInputDefinition.weekdayTitle,
    startTimeTitle: consultationHourInputDefinition.startTimeTitle,
    endTimeTitle: consultationHourInputDefinition.endTimeTitle,
    availabilityTitle: consultationHourInputDefinition.availabilityTitle,
    consultationHourInputDefinition,
    addButton: getButtonInstance(components, "addButton", {
      buttonKind: "primary",
      usage: "",
      text: "Zeiten hinzufügen",
    }),
    removeButton: getButtonInstance(components, "removeButton", {
      buttonKind: "primary",
      usage: "",
      text: "Entfernen",
    }),
  };
};
