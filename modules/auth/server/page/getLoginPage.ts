import { ILayout } from "@/modules/shell/client/components/Layout/types";
import { IPageConfig } from "@/modules/shell/types";
import { IPage } from "@/modules/page/types";
import { ILogin } from "@/modules/auth/types";
export const getLoginPage = async (
  content: IPage
): Promise<ILogin & IPageConfig> => {
  content.type = "Login";

  const layout: ILayout = {
    customKey: "login-form",
    rightColumnProps: { md: 4, lg: 6, xlg: 6 },
  };

  const shell: IPageConfig = {
    useHeader: true,
    layout,
  };

  return {
    ...content,
    ...shell,
  };
};

// TODO move to Login
