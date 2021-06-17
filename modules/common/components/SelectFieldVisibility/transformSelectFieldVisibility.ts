import { ISelectComponent } from "@/modules/components";
import { Locked16, Connect16, EarthFilled16 } from "@carbon/icons-react";
export interface ISelectFieldVisibilty extends ISelectComponent {
  value?: number;
}

export function transformSelectFieldVisibilty(props: ISelectFieldVisibilty) {
  const { value, items } = props;

  const icon = value === 0 ? EarthFilled16 : value === 1 ? Connect16 : Locked16;

  return { items, icon, value };
}
