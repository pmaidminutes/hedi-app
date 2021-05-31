import { IBusinessProfile, IProfile, IProfileEntry } from "../types";
import { IDataKind } from "../types/taxonomyTypes";

function selectPrimaryData<T extends { dataKind: IDataKind }>(
  set: T[]
): T | undefined {
  let match: T | undefined = undefined;
  let weight = 1000;
  set.forEach(item => {
    const itemWeightString = item.dataKind.route.match("/d+$/")?.[0];
    if (itemWeightString) {
      const itemWeight = parseInt(itemWeightString);
      if (itemWeight < weight) {
        weight = itemWeight;
        match = item;
      }
    }
  });
  return match;
}

export function transformProfileToEntry(
  profile: IProfile | IBusinessProfile
): IProfileEntry {
  const {
    type,
    route,
    label,
    lang,
    translations,
    addresses,
    phones,
    emails,
    ...profileRest
  } = profile;
  const { websites, profession, services } = profileRest as IBusinessProfile;
  return {
    type,
    route,
    label,
    lang,
    translations,
    profession,
    services,
    address: selectPrimaryData(addresses),
    phone: selectPrimaryData(phones),
    email: selectPrimaryData(emails),
    website: websites ? selectPrimaryData(websites) : undefined,
  };
}
