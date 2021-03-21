import { IService, IServiceGroup } from "@/modules/model";
import { useEffect, useState } from "react";

export function useServiceSelection(
  group: IServiceGroup,
  initialServices?: string[]
) {
  const { services } = group;
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedServices, setSelectedServices] = useState<IService[]>([]);

  useEffect(() => {
    const initial = group.services.filter(s =>
      initialServices?.includes(s.route)
    );
    setSelectedServices(initial);
  }, [initialServices]);

  const handleServiceClick = (service: IService) => {
    if (selectedServices.length > 0 && selectedServices.includes(service)) {
      setSelectedServices(prev => prev.filter(p => p !== service));
    } else {
      setSelectedServices(prev => [...prev, service]);
    }
  };

  const handleComponentClick = () => {
    setIsExpanded(prev => !prev);
  };
  return {
    services,
    selectedServices,
    isExpanded,
    handleServiceClick,
    handleComponentClick,
  };
}
