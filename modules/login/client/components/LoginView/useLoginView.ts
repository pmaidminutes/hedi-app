import {
  getUIElement,
  tryGetRedirect,
  getUIElementValue,
} from "@/modules/common/utils";
import { useAuthorizedRedirect } from "@/modules/react/hooks";
import { useRouter } from "next/router";
import { ILoginView } from "../../../types";

export const useLoginView = (content: ILoginView) => {
  const router = useRouter();
  const redirectUrl = tryGetRedirect(
    "redirect",
    content.elements,
    content.links,
    "/" + content.lang
  );
  useAuthorizedRedirect(redirectUrl);

  const backButtonText = getUIElementValue("back", content.elements);

  const backButtonProps = {
    tooltip: backButtonText,
    onClick: () => router.back(),
    children: backButtonText,
  };
  return { backButtonProps, redirectUrl };
};
