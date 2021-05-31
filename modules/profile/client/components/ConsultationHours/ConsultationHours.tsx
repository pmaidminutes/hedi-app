import {
  StructuredListWrapper,
  StructuredListBody,
  StructuredListRow,
  StructuredListCell,
} from "carbon-components-react";
import { IConsultationHour } from "../../../types/dataTypes";
import { transformConsultationHours } from "./transformConsultationHours";

export interface ConsultationHoursProps {
  title: string;
  consultationHours: IConsultationHour[];
}

export const ConsultationHours = ({
  title,
  consultationHours,
}: ConsultationHoursProps) => {
  const days = transformConsultationHours(consultationHours);
  return (
    <div className="hedi--consultation-hours-wrapper">
      <h3>{title}</h3>
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
