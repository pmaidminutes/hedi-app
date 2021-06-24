export type ActionBarType =
  | "audio"
  | "bookmark"
  | "share"
  | "print"
  | "language";

export interface IActionBarAction {
  type: ActionBarType;
  description: string;
  handler: Function;
}
