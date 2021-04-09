import { getUIElement } from "@/modules/common/utils";
import { orderedRequiredFields } from "@/modules/editProfile/types";
import { IUIElementTexts } from "@/modules/model";
import { ChangeEvent, FormEvent, RefObject, useState } from "react";

export function useValidationErrors(
  elements: IUIElementTexts[],
  refs: { [key: string]: RefObject<HTMLInputElement> },
  onSubmit: ((event: FormEvent<HTMLFormElement>) => void) | undefined
) {
  // TODO find better way to combine frontend and backend errors
  const [validationErrors, setValidationErrors] = useState<{
    [key: string]: string;
  }>({});

  const handleRequiredFieldChange = (e: ChangeEvent<HTMLInputElement>) => {
    const key = e.target.name;
    if (!e.target.value) {
      const message = getUIElement(e.target.name, elements)?.help ?? "x";
      setValidationErrors(previous => ({ ...previous, [key]: message }));
    } else {
      setValidationErrors(previous => {
        const { [key]: _, ...rest } = previous;
        return { ...rest };
      });
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.target as HTMLFormElement);

    const currentErrors: { [key: string]: string } = {};
    orderedRequiredFields.forEach(field => {
      if (!form.get(field)) {
        const message = getUIElement(field, elements)?.help || "";
        currentErrors[field] = message;
      }
    });
    setValidationErrors(currentErrors);

    const scrollToErrors = (currentErrors: { [key: string]: string }) => {
      for (let key of Object.keys(currentErrors)) {
        refs[key].current?.scrollIntoView();
        window.scrollBy(0, -100);
        return true;
      }
      return false;
    };
    const hasValidationErrors = scrollToErrors(currentErrors);
    if (!hasValidationErrors && onSubmit) onSubmit(e);
  };
  return { validationErrors, handleRequiredFieldChange, handleSubmit };
}