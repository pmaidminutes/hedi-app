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
  const [currenPosition, setCurrentPosition] = useState(0);
  const [isAtTheBottom, setIsAtTheBottom] = useState(false);

  const handleRouteChangeComplete = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top, left, behavior });
    }
  };

  console.log({ isAtTheBottom });
  useEffect(() => {
    if (!isAtTheBottom && currenPosition > 99) setIsAtTheBottom(true);
    if (isAtTheBottom && currenPosition < 99) setIsAtTheBottom(false);
  }, [currenPosition]);

  const router = useRouter();
  const { locale } = router;

  const buttonText = locale === "de" ? "nach oben" : "back to top";

  const handleScroll = () => {
    if (typeof window !== undefined && typeof document !== undefined) {
      const totalheight = document.documentElement.scrollHeight;
      const scrollheight = window.pageYOffset + window.innerHeight;
      setCurrentPosition((scrollheight / totalheight) * 100);
      setIsVisible(window.pageYOffset > 100);
    }
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
    isAtTheBottom,
    buttonText,
    isVisible,
    handleRouteChangeComplete,
  };
}
