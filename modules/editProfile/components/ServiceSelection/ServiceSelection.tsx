import React from "react";
import { useServiceSelection, IServiceSelection } from "./useServiceSelection";
import { SelectableTile, Tile, Tag } from "carbon-components-react";
import { ChevronDown16, ChevronUp16 } from "@carbon/icons-react";

export const ServiceSelection = (props: IServiceSelection) => {
  const {
    isExpanded,
    services,
    selectedServices,
    handleComponentClick,
    handleServiceClick,
  } = useServiceSelection(props);
  return (
    <Tile
      aria-expanded={isExpanded}
      className={`hedi-service_selection${isExpanded ? " is-expanded" : ""}`}>
      <div
        className="hedi-service_selection__head"
        onClick={() => handleComponentClick()}>
        <h2>Psychosoziale Beratung</h2>
        <span className="bx--tile__checkmark">
          {isExpanded ? <ChevronUp16 /> : <ChevronDown16 />}
        </span>
        {selectedServices.length > 0
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
