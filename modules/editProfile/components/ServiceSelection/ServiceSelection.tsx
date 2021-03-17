import React, { useState } from "react";
import { SelectableTile, Tile, Tag } from "carbon-components-react";
import { ChevronDown16, ChevronUp16 } from "@carbon/icons-react";
const services = [
  "Sexualberatung",
  "Verhütungsberatung",
  "Schwangerenberatung",
  "Beratung bei Trennung und Scheidung",
];

export const ServiceSelection = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const handleServiceClick = (service: string) => {
    if (selectedServices.length > 0 && selectedServices.includes(service)) {
      setSelectedServices(prev => prev.filter(p => p !== service));
    } else {
      setSelectedServices(prev => [...prev, service]);
    }
  };
  console.log({ selectedServices });
  return (
    <Tile
      aria-expanded={isExpanded}
      className={`hedi-service_selection${isExpanded ? " is-expanded" : ""}`}>
      <div className="hedi-service_selection__head" onClick={() => setIsExpanded(prev => !prev)}>
        <h2>Psychosoziale Beratung</h2>
        <span className="bx--tile__checkmark">
          {isExpanded ? <ChevronUp16 /> : <ChevronDown16 />}
        </span>
        {selectedServices
          ? selectedServices.map(service => <Tag type={"blue"}>{service}</Tag>)
          : null}
      </div>

      <div className="hedi-service_selection__content">
        {services.map(service => (
          <SelectableTile
            value={service}
            onChange={e => handleServiceClick(service)}>
            {service}
          </SelectableTile>
        ))}
      </div>
    </Tile>
  );
};
