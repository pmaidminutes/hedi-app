import { TableCell, TableRow } from "carbon-components-react";
import { IConsultationHourInput } from "@/modules/profile/types";
import { TextInput, Select } from "@/modules/components";
import {
  TextInput as ITextInput,
  Select as ISelect,
} from "@/modules/model/components";
import { useConsultationHourInput } from "./useConsultationHourInput";

export type IConsultationHourInputProps = {
  consultationHourInput?: Partial<IConsultationHourInput>;
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
}

interface IConsultationHourInputConfig {
  onChange?: (consultationHourInput: Partial<IConsultationHourInput>) => void;
}

export const ConsultationHourInput: React.FC<IConsultationHourInputProps> = props => {
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
    children,
    onChange,
  } = props;

  const {
    weekday,
    startTime,
    endTime,
    availability,
    state,
  } = useConsultationHourInput(initialConsultationHourInput, onChange);
  return (
    <TableRow>
      <TableCell data-th={weekdayTitle}>
        <Select {...weekday} {...weekdaySelect} />
      </TableCell>
      <TableCell data-th={startTimeTitle}>
        <TextInput {...startTime} {...startTimeTextInput} />
      </TableCell>
      <TableCell data-th={endTimeTitle}>
        <TextInput {...endTime} {...endTimeTextInput} />
      </TableCell>
      <TableCell data-th={availabilityTitle}>
        <Select {...availability} {...availabilitySelect} />
      </TableCell>
      <TableCell>
        {children}
        <input
          id="consultationHour"
          name="consultationHour"
          readOnly
          value={JSON.stringify(state)}
          hidden
        />
      </TableCell>
    </TableRow>
  );
};
