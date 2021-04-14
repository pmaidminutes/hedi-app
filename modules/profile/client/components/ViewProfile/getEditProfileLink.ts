import { IViewProfileView } from "@/modules/profile/types";

export const getEditProfileLink = ({
  lang,
  links,
}: Pick<IViewProfileView, "lang" | "links">) => {
  const editLink = links.find(l => l.key === "editprofile");

  return {
    route: editLink?.route ?? `/${lang}`,
    label: editLink?.longTitle ?? editLink?.label,
  };
};
