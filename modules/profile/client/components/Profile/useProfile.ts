import { getTextInputProps } from "@/modules/common/utils";
import { ProfileView } from "@/modules/profile/query";
import { isICaregiver, isIMidwife } from "../../../types";
export interface IProfileViewProps {
  content: ProfileView;
}

export function useProfile(props: IProfileViewProps) {
  const { content } = props;
  const {
    languageSkills,
    elements,
    displayName,
    postal_code,
    city,
    mail,
    website,
    phone,
    consultation_hours,
    street,
    house_number,
    displayAddress,
  } = content;
  const languagesHeadline = getTextInputProps("fluency", elements);
  const servicesHeadline = getTextInputProps("services", elements);
  const contactHeadline = getTextInputProps("office_hrs", elements);

  const services =
    isICaregiver(content) || isIMidwife(content) ? content.services : null;

  return {
    languagesData: {
      languageSkills,
      headline: languagesHeadline,
    },
    profileEntryData: {
      displayName,
      postal_code,
      city,
      mail,
      website,
      phone,
    },
    servicesData: {
      headline: servicesHeadline,
      services,
    },
    contactData: {
      headline: contactHeadline,
      phone,
      mail,
      website,
      consultation_hours,
      street,
      house_number,
      city,
      displayAddress,
      postal_code,
    },
  };
}
