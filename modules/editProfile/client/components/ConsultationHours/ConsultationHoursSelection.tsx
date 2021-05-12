import {
  Button,
  Column,
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "carbon-components-react";
import { Add32 } from "@carbon/icons-react";
import { IUIElementTexts } from "@/modules/model";
import { IConsultationHoursEntry } from "../../../types";
import { ConsultationHoursRow } from "./";
import { useConsultationHoursSelection } from "./hooks";
import { getUIElementValue } from "@/modules/common/utils";
export type ConsultationHoursSelectionProps = {
  config: {
    elements?: IUIElementTexts[];
    consultationDays: IUIElementTexts[];
    consultationTimeStart: IUIElementTexts[];
    consultationTimeEnd: IUIElementTexts[];
  };
  data?: IConsultationHoursEntry[];
};

export const ConsultationHoursSelection = ({
  config,
  data,
}: ConsultationHoursSelectionProps) => {
  const {
    consultationHoursEntries,
    handleAddClick,
    handleRemoveClick,
    handleItemChange,
  } = useConsultationHoursSelection(data);
  return (
    <>
      <Column>
        <Table>
          <TableHead>
            <TableRow>
              <TableHeader>
                {getUIElementValue(
                  "consultation_hours",
                  config.elements,
                  "Sprechzeiten"
                )}
              </TableHeader>
              <TableHeader>
                {getUIElementValue("time_Start", config.elements, "starten")}
              </TableHeader>
              <TableHeader>
                {getUIElementValue("time_End", config.elements, "End")}
              </TableHeader>
              <TableHeader>
                <Button
                  kind="primary"
                  renderIcon={Add32}
                  iconDescription={getUIElementValue(
                    "add-consultationHours",
                    config.elements,
                    "weitere Hinzufügen"
                  )}
                  onClick={handleAddClick}>
                  {getUIElementValue(
                    "add-consultationHours",
                    config.elements,
                    "Hinzufügen"
                  )}
                </Button>
              </TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            {consultationHoursEntries?.map((ls, i) => (
              <ConsultationHoursRow
                key={ls.day + ls.timeStart + ls.timeStart + i}
                config={config}
                data={ls}
                handleDeleteClick={() => {
                  handleRemoveClick(i);
                }}
                handleChange={changedData => handleItemChange(i, changedData)}
              />
            ))}
          </TableBody>
        </Table>
      </Column>
      <Column>
        <Button
          className="mobile-only"
          hasIconOnly={true}
          kind="primary"
          renderIcon={Add32}
          iconDescription={getUIElementValue(
            "add-ConsultationHours",
            config.elements,
            "weitere Hinzufügen"
          )}
          onClick={handleAddClick}></Button>
      </Column>
    </>
  );
};
