import {
  EntityFields,
  IEntity,
  ITranslatable,
  TranslatableFields,
} from "@/common/model/cms";

export interface IAudio extends ITranslatable, IEntity {
  url: string;
}

export const AudioFields = `
  ${EntityFields}
  ${TranslatableFields}
  url
`;
