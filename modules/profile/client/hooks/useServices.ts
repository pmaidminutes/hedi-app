import { IService } from "@/modules/model";
import { useState, useEffect } from "react";

export function useServices(services: IService[]) {
  const [hasServices, setHasServices] = useState(true);

  useEffect(() => {
    setHasServices(services.length > 0 ? true : false);
  }, [services]);

  return {
    hasServices,
  };
}
