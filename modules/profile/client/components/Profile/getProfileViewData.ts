import {
  getTextInputProps,
  getUIElementRedirectRoute,
  getUIElementValue,
} from "@/modules/common/utils";
import { IEntity, IUIElementTexts } from "@/modules/model";
import { IWithKey } from "@/modules/model/IWithKey";

export function getProfileViewData(
  elements: IUIElementTexts[],
  links: (IEntity & IWithKey)[],
  lang: string
) {
  const languagesHeadline = getTextInputProps("fluency", elements);
  const servicesHeadline = getTextInputProps("services", elements);
  const contactHeadline = getTextInputProps("contact", elements);
  const officeHrsHeadline = getTextInputProps("office_hrs", elements);
  const relatedHeadline = getTextInputProps("linked_profile", elements);
  const editBtnText = getUIElementValue("edit_button", elements);
  const editProfileLink = getUIElementRedirectRoute(
    "edit_redirect",
    elements,
    links
  );

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
