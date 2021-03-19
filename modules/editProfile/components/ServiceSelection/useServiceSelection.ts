import { useState } from "react";
export interface IServiceSelection {
  services: string[];
}
export function useServiceSelection(props: IServiceSelection) {
  const { services } = props;
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const handleServiceClick = (service: string) => {
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
