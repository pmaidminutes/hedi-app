import { IAppPage } from "@/modules/common/types";
import { EntityFields, IEntity } from "@/modules/model";

export interface IShellLink extends IEntity, Pick<IAppPage, "longTitle"> {
  key: string;
}

export const ShellLinkFields = `${EntityFields}
longTitle
key
`;
