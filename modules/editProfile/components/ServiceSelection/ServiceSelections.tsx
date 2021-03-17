import React, { useState } from "react";
import {
  ExpandableTile,
  SelectableTile,
  Tag,
  TileAboveTheFoldContent,
  TileBelowTheFoldContent,
  Tile,
  Accordion,
  AccordionItem,
  Checkbox,
  Row,
  Column,
} from "carbon-components-react";

const services = [
  "Sexualberatung",
  "Verhütungsberatung",
  "Schwangerenberatung",
  "Beratung bei Trennung und Scheidung",
];

export const ServiceSelections = () => {
  const [isSelected, setIsSelected] = useState(false);
  const [selectedServices, setSelectedServices] = useState(null);

  const handleServiceClick = (e: React.SyntheticEvent) => {
    e.preventDefault();
    // if (!selectedServices) setSelectedServices([]);
  };
  return (
    <div className="hedi--service_selection">
      <Accordion size={"xl"}>
        <AccordionItem title="Psychologische und Soziale Beratung">
          {services.map(service => (
            <SelectableTile
              onChange={e => handleServiceClick(e)}
              value={service}>
              {service}
            </SelectableTile>
          ))}
        </AccordionItem>
      </Accordion>
    </div>
  );
};
