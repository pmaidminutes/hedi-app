import { IAddress, IContact, IDetailedName } from "@/modules/model";

export interface IProfileEntryProps
  extends Pick<IAddress, "postal_code" | "city">,
    Pick<IDetailedName, "displayName">,
    Pick<IContact, "mail" | "website" | "phone"> {}

export function useProfileEntry(props: IProfileEntryProps) {
  const { displayName, postal_code, city, mail, website, phone } = props;

  return { displayName, postal_code, city, mail, website, phone };
}
