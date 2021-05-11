import { Button, Dropdown, TableCell, TableRow } from "carbon-components-react";
import { TrashCan32 } from "@carbon/icons-react";
import { IUIElementTexts } from "@/modules/model";
import { IConsultationHoursEntry } from "../../../types";
import { useConsultationHoursRow } from "./hooks";
import { getUIElementValue } from "@/modules/common/utils";

export type ConsultationHoursRowProps = {
  config: {
    elements?: IUIElementTexts[];
    consultationDays: IUIElementTexts[];
    consultationTimeStart: IUIElementTexts[];
    consultationTimeEnd: IUIElementTexts[];
  };
  data: IConsultationHoursEntry;
  handleDeleteClick?: () => void;
  handleChange?: (data: IConsultationHoursEntry) => void;
};

export const ConsultationHoursRow = ({
  config: {
    elements,
    consultationDays,
    consultationTimeStart,
    consultationTimeEnd,
  },
  data,
  handleDeleteClick,
  handleChange,
}: ConsultationHoursRowProps) => {
  // TODO add undefined entry for newly added rows
  const {
    consultationHours,
    handleDaysChange,
    handleTimeStartChange,
    handleTimeEndChange,
  } = useConsultationHoursRow(data, handleChange);
  return (
    <TableRow>
      <TableCell
        data-th={getUIElementValue(
          "consultation_hours",
          elements,
          "consultation_hours"
        )}>
        <Dropdown
          id="day"
          label={
            consultationDays.find(element => parseInt(element.identifier) === 0)
              ?.value ?? "Please Select"
          }
          ariaLabel={getUIElementValue("day", elements, "Tag")}
          titleText=""
          light
          selectedItem={
            consultationDays.find(
              item => item.identifier === consultationHours.day
            )?.identifier
          }
          items={consultationDays.map(item => item.identifier)}
          itemToString={i =>
            consultationDays.find(item => item.identifier == i.toString())
              ?.value || i.toString()
          }
          onChange={handleDaysChange}
        />
      </TableCell>
      <TableCell
        data-th={getUIElementValue("timeStart", elements, "Start Zeit")}>
        <Dropdown
          id="timeStart"
          label={
            consultationTimeStart.find(
              element => parseInt(element.identifier) === 0
            )?.value ?? "Please Select"
          }
          ariaLabel={getUIElementValue("timeStart", elements, "Start Zeit")}
          titleText=""
          light
          selectedItem={
            consultationTimeStart.find(
              l => l.identifier === consultationHours.timeStart
            )?.identifier
          }
          items={consultationTimeStart.map(level => level.identifier)}
          itemToString={i =>
            consultationTimeStart.find(
              level => level.identifier == i.toString()
            )?.value || i.toString()
          }
          onChange={handleTimeStartChange}
        />
      </TableCell>

      <TableCell data-th={getUIElementValue("timeEnd", elements, "End Zeit")}>
        <Dropdown
          id="timeEnd"
          label={
            consultationTimeEnd.find(
              element => parseInt(element.identifier) === 0
            )?.value ?? "Please Select"
          }
          ariaLabel={getUIElementValue("timeEnd", elements, "End Zeit")}
          titleText=""
          light
          selectedItem={
            consultationTimeEnd.find(
              l => l.identifier === consultationHours.timeEnd
            )?.identifier
          }
          items={consultationTimeEnd.map(level => level.identifier)}
          itemToString={i =>
            consultationTimeEnd.find(level => level.identifier == i.toString())
              ?.value || i.toString()
          }
          onChange={handleTimeEndChange}
        />
      </TableCell>
      <TableCell>
        <Button
          kind="ghost"
          renderIcon={TrashCan32}
          iconDescription={getUIElementValue(
            "remove-consultation",
            elements,
            "consultation_hours"
          )}
          hasIconOnly
          onClick={handleDeleteClick}
        />

        <input
          id="consultation_hours"
          name="consultation_hours"
          readOnly
          value={JSON.stringify(consultationHours)}
          hidden
        />
      </TableCell>
    </TableRow>
  );
};
