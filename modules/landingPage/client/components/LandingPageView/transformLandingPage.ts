import { ILandingPageView } from "@/modules/landingPage/types/ILandingPageView";

export function transformLandingPage(content: ILandingPageView) {
  const { linksIfLoggedIn, links } = content;

  const isLastElement = (count: number, array: any[]) => {
    return count === array.length ? true : false;
  };

  return { links, linksIfLoggedIn, isLastElement };
}
