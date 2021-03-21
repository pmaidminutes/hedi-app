import React from "react";
import { useServiceSelection } from "./useServiceSelection";
import { SelectableTile, Tile, Tag } from "carbon-components-react";
import { ChevronDown16, ChevronUp16 } from "@carbon/icons-react";
import { IServiceGroup } from "@/modules/model";

export const ServiceSelection = ({
  group,
  initialServices,
}: {
  group: IServiceGroup;
  initialServices?: string[];
}) => {
  const {
    isExpanded,
    services,
    selectedServices,
    handleComponentClick,
    handleServiceClick,
  } = useServiceSelection(group, initialServices);
  return (
    <Tile
      aria-expanded={isExpanded}
      className={`hedi-service_selection${isExpanded ? " is-expanded" : ""}`}>
      <div
        className="hedi-service_selection__head"
        onClick={() => handleComponentClick()}>
        <h2>{group.label}</h2>
        <span className="bx--tile__checkmark">
          {isExpanded ? <ChevronUp16 /> : <ChevronDown16 />}
        </span>
        {selectedServices.length > 0
          ? selectedServices.map(service => (
              <Tag type={"blue"} key={service.route}>
                {service.label}
              </Tag>
            ))
          : null}
      </div>

      <div className="hedi-service_selection__content">
        {services.map(service => (
          <SelectableTile
            key={service.route}
            //@ts-ignore
            name="services"
            value={service.route}
            defaultChecked={!!selectedServices?.find(s => s === service)}
            onChange={e => handleServiceClick(service)}>
            {service.label}
          </SelectableTile>
        ))}
      </div>
    </Tile>
  );
};
