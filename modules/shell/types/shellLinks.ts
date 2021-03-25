import { IAppPage } from "@/modules/common/types";
import { EntityFields, IEntity } from "@/modules/model";

export interface IShellLink extends IEntity, Pick<IAppPage, "longTitle"> {}

export const ShellLinkFields = `${EntityFields}
longTitle
`;
