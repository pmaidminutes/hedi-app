import { IProfile } from "../../types";
import { IPageConfig } from "@/modules/shell/types";
import { getProfileDefinition } from "../query/getProfileDefinition";
import { IProfileView } from "../../client/components";

export const getProfilePage = async (
  content: IProfile
): Promise<IProfileView & IPageConfig> => {
  const { components } = await getProfileDefinition(content.lang);

  const shell: IPageConfig = {
    useHeader: "AUTHORIZED",
    redirectUnAuthorized: "/" + content.lang,
    revalidate: 1,
  };

  return {
    ...content,
    components,
    ...shell,
  };
};
