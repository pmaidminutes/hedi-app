import { CaregiverFields, ICaregiver } from "./CaregiverType";
import { IParent, ParentFields } from "./ParentType";

export interface ICaregiverWithParents extends ICaregiver {
  parents?: IParent[];
}
export const CaregiverWithParentsFields = `${CaregiverFields}
parents
{
  ${ParentFields}
}
`;
