import {
  EntityLocalizedFields,
  IEntity,
  IEntityLocalized,
  implementsIEntity,
  implementsILocalized,
} from ".";

export interface IFile extends IEntity, IEntityLocalized {
  mime: string;
}

export const implementsIFile = (obj: any) =>
  implementsIEntity(obj) && implementsILocalized(obj);

export function isIFile(obj: any): obj is IFile {
  return implementsIFile(obj);
}

export const FileFields = `${EntityLocalizedFields}
mime`;
