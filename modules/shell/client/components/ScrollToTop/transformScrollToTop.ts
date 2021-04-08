import { useRouter } from "next/router";
export function transformScrollToTop() {
  const router = useRouter();
  const { locale } = router;

  // TODO get text from drupal
  const buttonText = locale === "de" ? "nach oben" : "back to top";

  return { buttonText };
}
