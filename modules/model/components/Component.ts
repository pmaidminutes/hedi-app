import { Body, BodyKind } from "./Body";
import { Button, ButtonKind } from "./Button";
import { Checkbox, CheckboxKind } from "./Checkbox";
import { DatePicker, DatePickerKind } from "./DatePicker";
import { Generic, GenericKind } from "./Generic";
import { Group, GroupKind } from "./Group";
import { Label, LabelKind } from "./Label";
import { Link, LinkKind } from "./Link";
import { Audio, AudioKind } from "./Audio";
import { File, FileKind } from "./File";
import { Image, ImageKind } from "./Image";
import { Svg, SvgKind } from "./Svg";
import { Video, VideoKind } from "./Video";

export type HTML = string;

export type ComponentKind =
  | never
  | BodyKind
  | ButtonKind
  | CheckboxKind
  | DatePickerKind
  | GenericKind
  | GroupKind
  | LabelKind
  | LinkKind
  | AudioKind
  | FileKind
  | ImageKind
  | SvgKind
  | VideoKind;

export interface IComponent {
  kind: ComponentKind;
  id: string;
}

export type Component =
  | Body
  | Button
  | Checkbox
  | DatePicker
  | Generic
  | Group
  | Label
  | Link
  | Audio
  | File
  | Image
  | Svg
  | Video;
