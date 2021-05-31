import { IProfile, IBusinessProfile } from "@/modules/profile/types";
import { IDataKind } from "@/modules/profile/types/taxonomyTypes";
import { IContact } from ".";

export const parseFromProfile = (
  profile: IProfile | IBusinessProfile
): IContact[] => {
  const contacts: IContact[] = [];
  profile.addresses.forEach(data => {
    const id = contacts.findIndex(c => c.dataKind === data.dataKind);
    if (id < 0) contacts.push({ dataKind: data.dataKind, address: data });
    contacts[id].address = data;
  });

  profile.phones.forEach(data => {
    const id = contacts.findIndex(c => c.dataKind === data.dataKind);
    if (id < 0) contacts.push({ dataKind: data.dataKind, phone: data });
    contacts[id].phone = data;
  });

  profile.emails.forEach(data => {
    const id = contacts.findIndex(c => c.dataKind === data.dataKind);
    if (id < 0) contacts.push({ dataKind: data.dataKind, email: data });
    contacts[id].email = data;
  });

  if ("websites" in profile) {
    profile.websites.forEach(data => {
      const id = contacts.findIndex(c => c.dataKind === data.dataKind);
      if (id < 0) contacts.push({ dataKind: data.dataKind, website: data });
      contacts[id].website = data;
    });
  }

  const sorted = contacts.sort((a, b) =>
    a.dataKind.route.localeCompare(b.dataKind.route)
  );

  if ("consultationHours" in profile && sorted.length > 0)
    sorted[0].consultationHours = profile.consultationHours;

  return sorted;
};
