import { ILayout } from "@/modules/shell/client/components/Layout/types";
import { IPageConfig } from "@/modules/shell/types";
import { IRegistration } from "../../types";
import { IPage } from "@/modules/page/types";

export const getRegistrationPage = async (
  content: IPage
): Promise<IRegistration & IPageConfig> => {
  content.type = "Registration";

  const layout: ILayout = {
    rightColumnProps: { md: 4, lg: 6, xlg: 6 },
  };

  const shell: IPageConfig = {
    useHeader: "AUTHORIZED",
    layout,
  };

  return {
    ...content,
    ...shell,
  };
};
