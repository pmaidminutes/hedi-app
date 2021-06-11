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
import { IConsultationHourInput } from "@/modules/profile/types";
import { IButtonComponent, ILabelComponent } from "@/modules/components/types";
import { Button, Label } from "@/modules/components";
import {
  ConsultationHourInput,
  IConsultationHourInputDefinition,
} from "./ConsultationHourInput";
import { useInteractiveList } from "@/modules/react/hooks";

export type IConsultationHoursInputProps = {
  consultationHours?: Partial<IConsultationHourInput>[];
} & IConsultationHoursInputDefinition &
  Partial<FormGroupProps>;

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

export const ConsultationHoursInput = (props: IConsultationHoursInputProps) => {
  const {
    consultationHours,
    consultationHoursLabel,
    weekdayTitle,
    startTimeTitle,
    endTimeTitle,
    availabilityTitle,
    consultationHourInputDefinition,
    addButton,
    removeButton,
    ...formGroupProps
  } = props;
  const {
    list: consultationHourInputs,
    handleAddClick,
    handleRemoveClick,
    handleItemChange,
  } = useInteractiveList(consultationHours);
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
              {consultationHourInputs?.map((chi, i) => (
                <ConsultationHourInput
                  {...consultationHourInputDefinition}
                  key={`${i}${chi?.weekday}${chi?.availability}`}
                  consultationHourInput={chi}
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
