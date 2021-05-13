import { ILayout } from "@/modules/shell/client/components/Layout/types";
import { IPageConfig } from "@/modules/shell/types";
import { getRegistrationDefinition } from "../query";
import { IRegistrationView } from "../../types";
import { IAppPage } from "@/modules/common/types";

export const getRegistrationPage = async (
  content: IAppPage
): Promise<IRegistrationView & IPageConfig> => {
  content.type = "Registration";

  const definition = await getRegistrationDefinition(content);

  const layoutImg = {
    alt: "Beschreibung",
    src: `${process.env.NEXT_PUBLIC_IMG_HEADER}`,
  };

  const layout: ILayout = {
    pageLayout: "imageAndColumn",
    layoutImg,
    rightColumnProps: { md: 4, lg: 6, xlg: 6 },
  };

  const shell: IPageConfig = {
    useHeader: "AUTHORIZED",
    layout,
  };

  return {
    ...content,
    ...definition,
    ...shell,
  };
};
