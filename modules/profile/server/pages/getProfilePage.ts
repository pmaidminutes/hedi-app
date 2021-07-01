import { IProfile } from "../../types";
import { IPageConfig } from "@/modules/shell/types";
import { getProfileDefinition } from "../query/getProfileDefinition";
import { IProfileView } from "../../client/components";

export const getProfilePage = async (
  content: IProfile
): Promise<IProfileView & IPageConfig> => {
  const { components } = await getProfileDefinition(content.lang);

  const shell: IPageConfig = {
    useHeader: true,
  };

  return {
    ...content,
    components,
    ...shell,
  };
};
