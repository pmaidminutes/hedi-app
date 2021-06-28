import { ICategory, ICategoryEntry } from "@/modules/editorial/category/types";
import { buildAssetUrl, isEven } from "@/modules/common/utils";
export interface IMainCategoryCard {
  category: ICategory;
  index: number;
}

const smallerColumProps = { lg: 4, md: 2, sm: 2 };
const biggerColumProps = { lg: 12, md: 6, sm: 2 };

export function transformMainCategoryCard(props: IMainCategoryCard) {
  const { category, index } = props;
  const { label, image, appStyle, route } = category;
  const rowIsEven = isEven(index);

  const firstColumnProps = isEven(index) ? biggerColumProps : smallerColumProps;
  const secondColumnProps = isEven(index)
    ? smallerColumProps
    : biggerColumProps;

  // const imgData = {alt: image?.alt, }

  return {
    rowIsEven,
    firstColumnProps,
    secondColumnProps,
    label,
    image,
    appStyle,
    route,
  };
}
