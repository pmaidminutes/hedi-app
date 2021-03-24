import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export interface IScroll {
  behavior?: ScrollBehavior;
  left?: number;
  top?: number;
}
export function useScrollToTop({
  left = 0,
  top = 0,
  behavior = "smooth",
}: IScroll) {
  let [isVisible, setIsVisible] = useState<boolean>(false);

  const handleRouteChangeComplete = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top, left, behavior });
    }
  };

  const router = useRouter();
  const { locale } = router
  
  const buttonText = locale === "de" ? "nach oben" : "back to top";

  const handleScroll = () => {
    setIsVisible(window.pageYOffset > 100);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll);
    }

    router.events.on("routeChangeComplete", handleRouteChangeComplete);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChangeComplete);
    };
  }, [behavior, left, top]);

  return {
    buttonText,
    isVisible,
    handleRouteChangeComplete
  };
}
