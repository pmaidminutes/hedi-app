import {
  IEntity,
  implementsIEntity,
} from ".";
import { EntityFields } from "./IEntity";

export interface IFeedback extends IEntity {
  comment: string;
  client_information: object;
  register_date: Date;
}

export const implementsIFeedback = (obj: any) =>
  implementsIEntity(obj) && 'comment' in obj && 'client_information' in obj;

export const FeedbackFields = `${EntityFields}
comment
client_information
register_date`;
