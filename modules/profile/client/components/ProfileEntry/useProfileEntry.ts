import { IAddress, IContact, IDetailedName } from "@/modules/model";

export interface IProfileEntryProps extends IAddress, IDetailedName, IContact {}

export function useProfileEntry(props: IProfileEntryProps) {
  const { displayName, postal_code, city, mail, website, phone } = props;

  return { displayName, postal_code, city, mail, website, phone };
}
