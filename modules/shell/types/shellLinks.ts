import { IAppPage } from "@/modules/common/types";
import { EntityFields, IEntity } from "@/modules/model";
import { IWithKey, WithKeyFields } from "@/modules/model/IWithKey";

export interface IShellLink
  extends IEntity,
    Pick<IAppPage, "longTitle">,
    IWithKey {}

export const ShellLinkFields = `${EntityFields}
longTitle
${WithKeyFields}
`;
