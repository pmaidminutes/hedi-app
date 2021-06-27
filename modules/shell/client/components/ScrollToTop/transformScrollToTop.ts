import { useRouter } from "next/router";
import { IScroll } from "./useScrollToTop";
export function transformScrollToTop(props: IScroll) {
  const { appStyle } = props;
  const router = useRouter();
  const { locale } = router;

  // TODO get text from drupal
  const buttonText = locale === "de" ? "nach oben" : "back to top";
  const colorClass = appStyle ? ` ${appStyle}--scroll-to-top` : "";

  return { buttonText, colorClass };
}
