import { TextInputProps } from "carbon-components-react";
import { IAddress, IContact } from "@/modules/model";
export interface IContactProps
  extends Pick<
      IAddress,
      "postal_code" | "city" | "displayAddress" | "house_number" | "street"
    >,
    Pick<IContact, "mail" | "website" | "phone" | "consultation_hours"> {
  headline: Pick<
    TextInputProps,
    "id" | "labelText" | "placeholder" | "helperText" | "aria-label"
  >;
  officeHrsHeadline: Pick<
    TextInputProps,
    "id" | "labelText" | "placeholder" | "helperText" | "aria-label"
  >;
}
