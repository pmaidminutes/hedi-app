import { ICaregiver, IInstitution, IMidwife, IOrganisation } from ".";

export type ProfileType =
  | "Parent"
  | "Caregiver"
  | "Midwife"
  | "Organisation"
  | "Institution";

export type Profile = ICaregiver | IMidwife | IOrganisation | IInstitution;
