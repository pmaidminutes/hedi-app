import { IService, IServiceGroup } from "@/modules/model";
import { useEffect, useState } from "react";

export type ISelectableService = Pick<IService, "label" | "route"> & {
  selected?: boolean;
};

export function useServiceSelection(
  group: IServiceGroup,
  initialServices?: string[]
) {
  const [services, setServices] = useState(
    group.services as ISelectableService[]
  );
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const initial = group.services.map(service => {
      const { label, route, ..._ } = service;
      return { label, route, selected: initialServices?.includes(route) };
    });
    setServices([...initial]);
  }, [group.label, initialServices]);

  const handleServiceClick = (service: ISelectableService) => {
    setServices(p =>
      [...p].map(s => {
        if (s.route === service.route) s.selected = !s.selected;
        return s;
      })
    );
  };

  const handleTagClose = (service: ISelectableService) => {
    setServices(p =>
      [...p].map(s => {
        if (s.route === service.route && s.selected) s.selected = false;
        return s;
      })
    );
  };

  const handleComponentClick = () => {
    setIsExpanded(prev => !prev);
  };
  return {
    services,
    isExpanded,
    handleServiceClick,
    handleComponentClick,
    handleTagClose,
  };
}
