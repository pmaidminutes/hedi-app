import { IAudioComponent, AudioKind } from "./Audio";
import { IBodyComponent, BodyKind } from "./Body";
import { IButtonComponent, ButtonKind } from "./Button";
import { ICheckboxComponent, CheckboxKind } from "./Checkbox";
import { IColumnComponent, ColumnKind } from "./Column";
import { IDatePickerComponent, DatePickerKind } from "./DatePicker";
import { IGenericComponent, GenericKind } from "./Generic";
import { IGroupComponent, GroupKind } from "./Group";
import {
  IInlineNotificationComponent,
  InlineNotificationKind,
} from "./InlineNotification";
import { ILabelComponent, LabelKind } from "./Label";
import { ILinkComponent, LinkKind } from "./Link";
import { IFileComponent, FileKind } from "./File";
import { IHeadlineComponent, HeadlineKind } from "./Headline";
import { IImageComponent, ImageKind } from "./Image";
import { INumberInputComponent, NumberInputKind } from "./NumberInput";
import { ISelectComponent, SelectKind } from "./Select";
import { ISliderComponent, SliderKind } from "./Slider";
import { ISvgComponent, SvgKind } from "./Svg";
import { ITextAreaComponent, TextAreaKind } from "./TextArea";
import { ITextInputComponent, TextInputKind } from "./TextInput";
import {
  IToastNotificationComponent,
  ToastNotificationKind,
} from "./ToastNotification";
import { IToggleComponent, ToggleKind } from "./Toggle";
import { IVideoComponent, VideoKind } from "./Video";

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
  | HeadlineKind
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
  | IAudioComponent
  | IBodyComponent
  | IButtonComponent
  | ICheckboxComponent
  | IColumnComponent
  | IDatePickerComponent
  | IFileComponent
  | IGenericComponent
  | IGroupComponent
  | IHeadlineComponent
  | IImageComponent
  | IInlineNotificationComponent
  | ILabelComponent
  | ILinkComponent
  | INumberInputComponent
  | ISelectComponent
  | ISliderComponent
  | ISvgComponent
  | ITextAreaComponent
  | ITextInputComponent
  | IToastNotificationComponent
  | IToggleComponent
  | IVideoComponent;
