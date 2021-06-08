import { gql } from "@/modules/graphql";
import {
  IEntityLocalized,
  EntityLocalizedFields,
  EntityTranslatedFields,
  IEntityTranslated,
} from "@/modules/model";
import { Component } from "@/modules/components/types";

export interface IPageEntry extends IEntityLocalized {
  id: string;
  description?: string;
}

export const PageEntryGQL = gql`... on Page {
${EntityLocalizedFields}
id
description
}`;

export const isIPageEntry = (obj: any): obj is IPageEntry =>
  obj != null && obj?.type === "Page";

export enum PageVisibility {
  Public = 0,
  LoggedIn = 1,
  User = 2,
  Internal = 3,
}

export interface IPage extends IEntityTranslated<IEntityLocalized> {
  id: string;
  visibility: PageVisibility;
  components: Component[];
}

export const PageGQL = gql`... on Page {
  ${EntityTranslatedFields}
  id
  visibility
  components
}`;

export const isIPage = (obj: any): obj is IPage =>
  obj != null && obj?.type === "Page";
