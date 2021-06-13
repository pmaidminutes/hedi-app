import { TableCell, TableRow } from "carbon-components-react";
import {
  ITextInputComponent,
  TextInput,
  ISelectComponent,
  Select,
} from "@/modules/components";
import {
  ConsultationHourInputDefault,
  IConsultationHourInput,
} from "../../../../types";
import { useConsultationHourInput } from "./useConsultationHourInput";

export type IConsultationHourInputProps = {
  value?: Partial<IConsultationHourInput>;
} & IConsultationHourInputDefinition &
  IConsultationHourInputConfig;

export interface IConsultationHourInputDefinition {
  weekdayTitle?: string;
  weekdaySelect: ISelectComponent;
  startTimeTitle?: string;
  startTimeTextInput: ITextInputComponent;
  endTimeTitle?: string;
  endTimeTextInput: ITextInputComponent;
  availabilityTitle?: string;
  availabilitySelect: ISelectComponent;
}

interface IConsultationHourInputConfig {
  defaultValue?: IConsultationHourInput;
  onChange?: (consultationHourInput: Partial<IConsultationHourInput>) => void;
}

export const ConsultationHourInput: React.FC<IConsultationHourInputProps> = props => {
  const {
    value,
    weekdayTitle,
    weekdaySelect,
    startTimeTitle,
    startTimeTextInput,
    endTimeTitle,
    endTimeTextInput,
    availabilityTitle,
    availabilitySelect,
    defaultValue,
    onChange,
    children,
  } = props;

  const {
    weekday,
    startTime,
    endTime,
    availability,
    state,
  } = useConsultationHourInput(
    value ?? defaultValue ?? ConsultationHourInputDefault,
    onChange
  );
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
