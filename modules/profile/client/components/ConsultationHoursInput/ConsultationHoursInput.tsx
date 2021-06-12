import {
  Column,
  FormGroup,
  FormGroupProps,
  Row,
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "carbon-components-react";
import { Add32, TrashCan32 } from "@carbon/icons-react";
import {
  IButtonComponent,
  Button,
  ILabelComponent,
  Label,
} from "@/modules/components";
import { IConsultationHourInput } from "../../../types";
import {
  ConsultationHourInput,
  IConsultationHourInputDefinition,
} from "./ConsultationHourInput";
import { useInteractiveList } from "@/modules/react/hooks";

export type IConsultationHoursInputProps = {
  value?: Partial<IConsultationHourInput>[];
} & IConsultationHoursInputDefinition &
  IConsultationHoursInputConfig &
  Partial<Omit<FormGroupProps, "onChange">>;

export interface IConsultationHoursInputDefinition {
  consultationHoursLabel: ILabelComponent;
  weekdayTitle?: string;
  startTimeTitle?: string;
  endTimeTitle?: string;
  availabilityTitle?: string;
  consultationHourInputDefinition: IConsultationHourInputDefinition;
  addButton: IButtonComponent;
  removeButton: IButtonComponent;
}

interface IConsultationHoursInputConfig {
  onChange?: (consultationHours: Partial<IConsultationHourInput>[]) => void;
}

export const ConsultationHoursInput = (props: IConsultationHoursInputProps) => {
  const {
    value,
    consultationHoursLabel,
    weekdayTitle,
    startTimeTitle,
    endTimeTitle,
    availabilityTitle,
    consultationHourInputDefinition,
    addButton,
    removeButton,
    onChange,
    ...formGroupProps
  } = props;
  const {
    list: consultationHourInputs,
    handleAddClick,
    handleRemoveClick,
    handleItemChange,
  } = useInteractiveList(value, onChange);
  return (
    <FormGroup
      legendText={<Label {...consultationHoursLabel} />}
      {...formGroupProps}>
      <Row>
        <Column>
          <Table>
            <TableHead>
              <TableRow>
                <TableHeader>{weekdayTitle ?? "Wochentag"}</TableHeader>
                <TableHeader>{startTimeTitle ?? "Von"}</TableHeader>
                <TableHeader>{endTimeTitle ?? "Bis"}</TableHeader>
                <TableHeader>
                  {availabilityTitle ?? "Verfügbarkeit"}
                </TableHeader>
                <TableHeader>
                  <Button
                    {...addButton}
                    renderIcon={Add32}
                    onClick={handleAddClick}
                  />
                </TableHeader>
              </TableRow>
            </TableHead>
            <TableBody>
              {consultationHourInputs?.map((value, i) => (
                <ConsultationHourInput
                  {...consultationHourInputDefinition}
                  key={`${i}${value?.weekday}${value?.availability}`}
                  value={value}
                  onChange={item => handleItemChange(item, i)}>
                  <Button
                    {...removeButton}
                    hasIconOnly
                    renderIcon={TrashCan32}
                    onClick={_ => handleRemoveClick(i)}
                  />
                </ConsultationHourInput>
              ))}
            </TableBody>
          </Table>
        </Column>
        <Column>
          <Button
            {...addButton}
            className="mobile-only"
            hasIconOnly={true}
            renderIcon={Add32}
            onClick={handleAddClick}
          />
        </Column>
      </Row>
    </FormGroup>
  );
};
