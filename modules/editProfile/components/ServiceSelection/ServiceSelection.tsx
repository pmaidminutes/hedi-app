import React from "react";
import { useServiceSelection } from "./useServiceSelection";
import { SelectableTile, Tile, Tag } from "carbon-components-react";
import { ChevronDown16, ChevronUp16 } from "@carbon/icons-react";
import { IServiceGroup, IUIElementTexts } from "@/modules/model";
import { tryGetValue } from "@/modules/common/utils";

export type ServiceSelectionProps = {
  config: {
    elements?: IUIElementTexts[];
    serviceGroup: IServiceGroup;
  };
  data?: string[];
};

export const ServiceSelection = ({
  config: { elements, serviceGroup },
  data,
}: ServiceSelectionProps) => {
  const {
    isExpanded,
    services,
    handleComponentClick,
    handleServiceClick,
    handleTagClose,
  } = useServiceSelection(serviceGroup, data);
  return (
    <Tile
      aria-expanded={isExpanded}
      className={`hedi--service-selection${isExpanded ? " is-expanded" : ""}`}>
      <div
        className="hedi--service-selection__head"
        onClick={() => handleComponentClick()}>
        <h2>{serviceGroup.label}</h2>
        <span className="bx--tile__checkmark">
          {isExpanded ? <ChevronUp16 /> : <ChevronDown16 />}
        </span>
        {services.findIndex(s => s.selected) >= 0 ? (
          services.map(
            s =>
              !!s.selected && (
                <Tag
                  type={"blue"}
                  key={s.route}
                  filter
                  onClose={() => handleTagClose(s)}>
                  {s.label}
                </Tag>
              )
          )
        ) : (
          <Tag type={"warm-gray"}>
            {tryGetValue("add-service", elements, "Hinzufügen")}
          </Tag>
        )}
      </div>

      <div className="hedi--service-selection__content">
        {services.map(s => (
          <SelectableTile
            key={s.route}
            //@ts-ignore
            name="services"
            value={s.route}
            selected={s.selected}
            onChange={() => handleServiceClick(s)}>
            {s.label}
          </SelectableTile>
        ))}
      </div>
    </Tile>
  );
};
