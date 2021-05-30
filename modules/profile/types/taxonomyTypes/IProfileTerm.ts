import { IEntity, EntityFields, TypedFields } from "@/modules/model";

export interface IProfileTerm extends Omit<IEntity, "type"> {}

export const ProfileTermFields = EntityFields.replace(TypedFields, "");
