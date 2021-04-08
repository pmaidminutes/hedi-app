import { IService } from "@/modules/model";
import { useState, useEffect } from "react";

export function useServices(services: IService[]) {
  const [hasServices, setHasServices] = useState(services.length > 0);

  useEffect(() => {
    setHasServices(services.length > 0);
  }, [services]);

  return {
    hasServices,
  };
}
