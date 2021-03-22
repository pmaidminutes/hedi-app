import { getTextInputProps } from "@/modules/common/utils";
import { ProfileView } from "@/modules/profile/query";
import {
  ICaregiver,
  IInstitution,
  IMidwife,
  IOrganisation,
} from "@/modules/profile/types";
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
  } = content;
  const headline = getTextInputProps("fluency", elements);

  return {
    languagesData: {
      languageSkills,
      headline,
    },
    profileEntryData: {
      displayName,
      postal_code,
      city,
      mail,
      website,
      phone,
    },
  };
}
