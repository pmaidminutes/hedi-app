import { Button } from "carbon-components-react";
import { ArrowUp32 } from "@carbon/icons-react";
import { useScrollToTop, IScroll } from "./useScrollToTop";

export const ScrollToTop = (props: IScroll): JSX.Element => {
  const {
    handleRouteChangeComplete,
    isVisible,
    buttonText,
    isAtTheBottom,
  } = useScrollToTop(props);

  return (
    <div
      className={`hedi--scroll-to-top${
        isAtTheBottom ? " hedi--scroll-to-top__bottom" : ""
      }`}>
      {isVisible ? (
        <Button
          hasIconOnly
          renderIcon={ArrowUp32}
          iconDescription={buttonText}
          tooltipPosition="left"
          onClick={() => handleRouteChangeComplete()}
        />
      ) : null}
    </div>
  );
};
export default ScrollToTop;