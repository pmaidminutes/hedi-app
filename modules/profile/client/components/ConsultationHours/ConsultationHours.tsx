import {
  StructuredListWrapper,
  StructuredListBody,
  StructuredListRow,
  StructuredListCell,
} from "carbon-components-react";
import { IConsultationHour } from "../../../types/dataTypes";
import { transformConsultationHours } from "./transformConsultationHours";

export type IConsultationHoursProps = IConsultationHours &
  IConsultationHoursDefinition;

export interface IConsultationHours {
  consultationHours: IConsultationHour[];
}

export interface IConsultationHoursDefinition {
  headline?: string;
}

export const ConsultationHours = ({
  headline,
  consultationHours,
}: IConsultationHoursProps) => {
  const days = transformConsultationHours(consultationHours);
  return (
    <div className="hedi--consultation-hours-wrapper">
      <h3>{headline}</h3>
      <StructuredListWrapper>
        <StructuredListBody>
          {days.map(day => (
            <StructuredListRow>
              {day && (
                <>
                  <StructuredListCell>{day.day}</StructuredListCell>
                  <StructuredListCell>{day.times}</StructuredListCell>
                  <StructuredListCell>{day.availability}</StructuredListCell>
                </>
              )}
            </StructuredListRow>
          ))}
        </StructuredListBody>
      </StructuredListWrapper>
    </div>
  );
};
