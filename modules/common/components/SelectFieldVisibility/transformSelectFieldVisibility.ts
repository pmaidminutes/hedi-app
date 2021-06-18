import { ISelectComponent } from "@/modules/components";

export interface ISelectFieldVisibilty extends ISelectComponent {
  value?: number;
  onChange?: (value: number) => void;
}

export function transformSelectFieldVisibilty(props: ISelectFieldVisibilty) {
  const { value, items, onChange } = props;

  return {
    items,
    value: value || 0,
    onChange: onChange || (() => console.log("Function missing")),
  };
}
