import { ISelectItem } from "@/modules/components";
export interface ISelectFieldVisibilityItem extends Omit<ISelectItem, "route"> {
  value?: number;
}

export function transformSelectFieldVisibilityItem(
  props: ISelectFieldVisibilityItem
) {
  const { label, index, value } = props;

  let fieldClassName = `hedi--field-visibility__item`;
  if (index || index === 0) {
    console.log({ label });
    fieldClassName = `${fieldClassName}${
      index === 0 ? " public" : index === 1 ? " connected" : " locked"
    }`;
    if (value) {
      fieldClassName = `${fieldClassName}${index === value ? " selected" : ""}`;
    }
  }

  return { itemText: label, fieldClassName };
}
