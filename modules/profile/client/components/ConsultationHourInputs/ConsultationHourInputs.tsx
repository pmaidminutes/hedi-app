import {
  Column,
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "carbon-components-react";
import { Add32 } from "@carbon/icons-react";
import { IConsultationHour } from "@/modules/profile/types";
import { Button as IButton } from "@/modules/model/components";
import { Button } from "@/modules/components";
import {
  ConsultationHourInput,
  IConsultationHourInputDefinition,
} from "./ConsultationHourInput";
import { useConsultationHourInputs } from "./useConsultationHourInputs";

export type IConsultationHourInputsProps = {
  consultationHours?: IConsultationHour[];
} & IConsultationHourInputsDefinition;

export interface IConsultationHourInputsDefinition {
  consultationHourInputDefinition: IConsultationHourInputDefinition;
  weekdayTitle?: string;
  startTimeTitle?: string;
  endTimeTitle?: string;
  availabilityTitle?: string;
  addButton: IButton;
}

export const ConsultationHoursInput = (props: IConsultationHourInputsProps) => {
  const {
    consultationHours,
    consultationHourInputDefinition,
    weekdayTitle,
    startTimeTitle,
    endTimeTitle,
    availabilityTitle,
    addButton,
  } = props;
  const {
    consultationHourInputs,
    handleAddClick,
    handleRemoveClick,
    handleItemChange,
  } = useConsultationHourInputs(consultationHours);
  return (
    <>
      <Column>
        <Table>
          <TableHead>
            <TableRow>
              <TableHeader>{weekdayTitle ?? "Wochentag"}</TableHeader>
              <TableHeader>{startTimeTitle ?? "Von"}</TableHeader>
              <TableHeader>{endTimeTitle ?? "Bis"}</TableHeader>
              <TableHeader>{availabilityTitle ?? "Verfügbarkeit"}</TableHeader>
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
                onRemoveClick={() => {
                  handleRemoveClick(i);
                }}
                onChange={changedData => handleItemChange(i, changedData)}
              />
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
    </>
  );
};
