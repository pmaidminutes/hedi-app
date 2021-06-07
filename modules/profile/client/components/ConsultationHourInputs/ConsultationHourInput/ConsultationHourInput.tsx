import { TableCell, TableRow } from "carbon-components-react";
import { TrashCan32 } from "@carbon/icons-react";
import {
  IConsultationHour,
  IConsultationHourInput,
} from "@/modules/profile/types";
import { Button, TextInput, Select } from "@/modules/components";
import {
  Button as IButton,
  TextInput as ITextInput,
  Select as ISelect,
} from "@/modules/model/components";
import { useConsultationHourInput } from "./useConsultationHourInput";

export type IConsultationHourInputProps = {
  consultationHourInput?: IConsultationHourInput;
} & IConsultationHourInputDefinition &
  IConsultationHourInputConfig;

export interface IConsultationHourInputDefinition {
  weekdayTitle?: string;
  weekdaySelect: ISelect;
  startTimeTitle?: string;
  startTimeTextInput: ITextInput;
  endTimeTitle?: string;
  endTimeTextInput: ITextInput;
  availabilityTitle?: string;
  availabilitySelect: ISelect;
  removeButton: IButton;
}

interface IConsultationHourInputConfig {
  onRemoveClick?: () => void;
  onChange?: (consultationHourInput: IConsultationHourInput) => void;
}

export const ConsultationHourInput = (props: IConsultationHourInputProps) => {
  const {
    consultationHourInput: initialConsultationHourInput,
    weekdayTitle,
    weekdaySelect,
    startTimeTitle,
    startTimeTextInput,
    endTimeTitle,
    endTimeTextInput,
    availabilityTitle,
    availabilitySelect,
    removeButton,
    onRemoveClick,
    onChange,
  } = props;
  const {
    consultationHourInput,
    handleWeekdayChange,
    handleStartTimeChange,
    handleEndTimeChange,
    handleAvailabilityChange,
  } = useConsultationHourInput(initialConsultationHourInput, onChange);
  return (
    <TableRow>
      <TableCell data-th={weekdayTitle ?? "Wochentag"}>
        <Select {...weekdaySelect} onChange={handleWeekdayChange} />
      </TableCell>
      <TableCell data-th={startTimeTitle ?? "Von"}>
        <TextInput {...startTimeTextInput} onChange={handleStartTimeChange} />
      </TableCell>
      <TableCell data-th={endTimeTitle ?? "Bis"}>
        <TextInput {...endTimeTextInput} onChange={handleEndTimeChange} />
      </TableCell>
      <TableCell data-th={availabilityTitle ?? "Verfügbarkeit"}>
        <Select {...availabilitySelect} onChange={handleAvailabilityChange} />
      </TableCell>
      <TableCell>
        <Button
          {...removeButton}
          hasIconOnly
          renderIcon={TrashCan32}
          onClick={onRemoveClick}
        />

        <input
          id="consultationHour"
          name="consultationHour"
          readOnly
          value={JSON.stringify(consultationHourInput)}
          hidden
        />
      </TableCell>
    </TableRow>
  );
};
