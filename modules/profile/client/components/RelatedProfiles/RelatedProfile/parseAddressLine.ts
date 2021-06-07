import { IAddress } from "@/modules/profile/types/dataTypes";

export function parseAddressLine(addresses?: IAddress[]): string | undefined {
  if (!addresses) return addresses;
  else {
    const addressMap = new Set(addresses.map(a => a.city));
    return Array.from(addressMap).join(" | ");
  }
}
