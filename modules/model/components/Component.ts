import { Body, BodyKind } from "./Body";
import { Button, ButtonKind } from "./Button";
import { Checkbox, CheckboxKind } from "./Checkbox";
import { Column, ColumnKind } from "./Column";
import { DatePicker, DatePickerKind } from "./DatePicker";
import { Generic, GenericKind } from "./Generic";
import { Group, GroupKind } from "./Group";
import {
  InlineNotification,
  InlineNotificationKind,
} from "./InlineNotification";
import { Label, LabelKind } from "./Label";
import { Link, LinkKind } from "./Link";
import { Audio, AudioKind } from "./Audio";
import { File, FileKind } from "./File";
import { Image, ImageKind } from "./Image";
import { Svg, SvgKind } from "./Svg";
import { Video, VideoKind } from "./Video";
import { ToastNotification, ToastNotificationKind } from "./ToastNotification";
import { TextInput, TextInputKind } from "./TextInput";
import { NumberInput, NumberInputKind } from "./NumberInput";
import { Select, SelectKind } from "./Select";
import { Slider, SliderKind } from "./Slider";
import { TextArea, TextAreaKind } from "./TextArea";
import { Toggle, ToggleKind } from "./Toggle";

export type HTML = string;

export type ComponentKind =
  | never
  | BodyKind
  | ButtonKind
  | ColumnKind
  | CheckboxKind
  | DatePickerKind
  | GenericKind
  | GroupKind
  | ColumnKind
  | LabelKind
  | LinkKind
  | AudioKind
  | FileKind
  | ImageKind
  | SvgKind
  | VideoKind
  | NumberInputKind
  | SelectKind
  | SliderKind
  | TextAreaKind
  | TextInputKind
  | ToggleKind
  | InlineNotificationKind
  | ToastNotificationKind;

export interface IComponent {
  kind: ComponentKind;
  id: string;
}

export type Component =
  | Body
  | Button
  | Column
  | Checkbox
  | Column
  | DatePicker
  | Generic
  | Group
  | InlineNotification
  | Label
  | Link
  | Audio
  | File
  | Image
  | Svg
  | Video
  | NumberInput
  | Select
  | Slider
  | TextArea
  | TextInput
  | Toggle
  | InlineNotification
  | ToastNotification;
