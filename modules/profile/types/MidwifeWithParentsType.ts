import { IMidwife, MidwifeFields } from "./MidwifeType";
import { IParent, ParentFields } from "./ParentType";

export interface IMidwifeWithParents extends IMidwife {
  parents?: IParent[];
}

export const MidwifeWithParentsFields = `${MidwifeFields}
parents
{
  ${ParentFields}
}
  `;
