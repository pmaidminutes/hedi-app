import { IValidationFunction } from "@/modules/react/validation";
import { NumberInputProps } from "carbon-components-react";
import { INumberInputProps } from "../client/components/NumberInput/transformNumberInput";

export interface IValidatedNumberInputProps extends NumberInputProps {
  validateFn?: IValidationFunction | IValidationFunction[];
  enableValidation?: Boolean;
  onValidation?: (textError: string | string[]) => void;
}
