import { Body, BodyKind } from "../../model/components/Body";
import { Button, ButtonKind } from "../../model/components/Button";
import { Checkbox, CheckboxKind } from "../../model/components/Checkbox";
import { Column, ColumnKind } from "../../model/components/Column";
import { DatePicker, DatePickerKind } from "../../model/components/DatePicker";
import { Generic, GenericKind } from "../../model/components/Generic";
import { Group, GroupKind } from "../../model/components/Group";
import {
  InlineNotification,
  InlineNotificationKind,
} from "../../model/components/InlineNotification";
import { Label, LabelKind } from "../../model/components/Label";
import { Link, LinkKind } from "../../model/components/Link";
import { IAudioComponent, AudioKind } from "./IAudioComponent";
import { File, FileKind } from "../../model/components/File";
import { Image, ImageKind } from "../../model/components/Image";
import { Svg, SvgKind } from "../../model/components/Svg";
import { Video, VideoKind } from "../../model/components/Video";
import { ToastNotification, ToastNotificationKind } from "../../model/components/ToastNotification";
import { TextInput, TextInputKind } from "../../model/components/TextInput";
import { NumberInput, NumberInputKind } from "../../model/components/NumberInput";
import { Select, SelectKind } from "../../model/components/Select";
import { Slider, SliderKind } from "../../model/components/Slider";
import { TextArea, TextAreaKind } from "../../model/components/TextArea";
import { Toggle, ToggleKind } from "../../model/components/Toggle";

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
  id?: string;
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
  | IAudioComponent
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
