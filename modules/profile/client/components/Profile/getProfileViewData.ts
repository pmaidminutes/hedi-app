import { getTextInputProps, tryGetValue } from "@/modules/common/utils";
import { IUIElementTexts } from "@/modules/model";

export function getProfileViewData(elements: IUIElementTexts[], lang: string) {
  const languagesHeadline = getTextInputProps("fluency", elements);
  const servicesHeadline = getTextInputProps("services", elements);
  const contactHeadline = getTextInputProps("contact", elements);
  const officeHrsHeadline = getTextInputProps("office_hrs", elements);
  const relatedHeadline = getTextInputProps("linked_profile", elements);
  const editBtnText = tryGetValue("edit_button", elements);
  const editProfileLink = "/" + lang + "/user/profile/edit";

  return {
    languagesHeadline,
    servicesHeadline,
    contactHeadline,
    officeHrsHeadline,
    relatedHeadline,
    editButtonProps: {
      editBtnText,
      editProfileLink,
    },
  };
}
