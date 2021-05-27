import { Body, BodyKind } from "./Body";
import { Button, ButtonKind } from "./Button";
import { Checkbox, CheckboxKind } from "./Checkbox";
import { Column, ColumnKind } from "./Column";
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
import {
  InlineNotification,
  InlineNotificationKind,
} from "./InlineNotification";
import { ToastNotification, ToastNotificationKind } from "./ToastNotification";
import { NumberInput, NumberInputKind } from "./NumberInput";
import { Slider, SliderKind } from "./Slider";
import { TextArea, TextAreaKind } from "./TextArea";
import { TextInput, TextInputKind } from "./TextInput";
import { Toggle, ToggleKind } from "./Toggle";

export type HTML = string;

export type ComponentKind =
  | never
  | BodyKind
  | ButtonKind
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
  | Checkbox
  | Column
  | DatePicker
  | Generic
  | Group
  | Label
  | Link
  | Audio
  | File
  | Image
  | Svg
  | Video
  | NumberInput
  | Slider
  | TextArea
  | TextInput
  | Toggle
  | InlineNotification
  | ToastNotification;
