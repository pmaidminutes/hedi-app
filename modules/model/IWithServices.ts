import { IService, ServiceFields } from "./IService";

export interface IWithServices {
  services: IService[];
}

export const WithServiceFields = `services { ${ServiceFields} } `;
