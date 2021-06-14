import React from "react";
import { useServiceSelection } from "./useServiceSelection";
import { SelectableTile, Tile, Tag } from "carbon-components-react";
import { ChevronDown16, ChevronUp16 } from "@carbon/icons-react";
import { IService, IServiceGroup } from "@/modules/model";

// TODO just removed uiElement stuff, completely WIP until service content is redone
export type IServiceSelectionProps = {
  services?: IService[];
} & IServiceSelectionDefinition;

export interface IServiceSelectionDefinition {
  serviceGroup: IServiceGroup;
  addTitle?: string;
}

export const ServiceSelection = (props: IServiceSelectionProps) => {
  const { services: initialServices, serviceGroup, addTitle } = props;
  const {
    isExpanded,
    services,
    handleComponentClick,
    handleServiceClick,
    handleTagClose,
  } = useServiceSelection(serviceGroup, initialServices);
  return (
    <Tile
      aria-expanded={isExpanded}
      className={`hedi--service-selection${isExpanded ? " is-expanded" : ""}`}>
      <div
        className="hedi--service-selection__head"
        onClick={() => handleComponentClick()}>
        <h4>{serviceGroup.label}</h4>
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
          <Tag type={"warm-gray"}>{addTitle ?? "Hinzufügen"}</Tag>
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
