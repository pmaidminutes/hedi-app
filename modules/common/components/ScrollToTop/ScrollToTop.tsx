import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Button } from "carbon-components-react";

interface IScroll {
  behavior?: ScrollBehavior;
  left?: number;
  top?: number;
}
export const ScrollToTop = ({
  left = 0,
  top = 0,
  behavior = "smooth",
}: IScroll): JSX.Element => {
  let [isVisible, setIsVisible] = useState<boolean>(false);
  const router = useRouter();

  const handleRouteChangeComplete = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top, left, behavior });
    }
  };

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

  return (
    <div className="hedi--scroll-to-top">
      {isVisible ? (
        <Button type="button" onClick={() => handleRouteChangeComplete()}>
          TOP {/* TODO change the label */}
        </Button>
      ) : (
        ""
      )}
    </div>
  );
};
export default ScrollToTop;
