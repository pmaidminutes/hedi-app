import { EntityFields, IEntity } from "@/modules/model";
import { IWithKey, WithKeyFields } from "@/modules/model/IWithKey";

export interface IShellLink extends IEntity, IWithKey {}

export const ShellLinkFields = `${EntityFields}
longTitle
${WithKeyFields}
`;
