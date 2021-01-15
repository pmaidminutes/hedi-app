import { IEntityLocalized } from "@/modules/model";

export interface IAudio extends IEntityLocalized {
  mime: string;
}

export const AudioFields = `
  label
  route
  mime
`;
