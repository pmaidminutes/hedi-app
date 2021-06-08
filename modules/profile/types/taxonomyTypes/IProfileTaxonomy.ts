import { IEntity, EntityFields, TypedFields } from "@/modules/model";

export interface IProfileTaxonomy extends Omit<IEntity, "type"> {}

export const ProfileTaxonomyFields = EntityFields.replace(TypedFields, "");
