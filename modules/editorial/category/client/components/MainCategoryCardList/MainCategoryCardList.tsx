import React from "react";
import { ICategory, ICategoryEntry } from "../../../types";

export interface IMainCategoryCardList {
  categories: ICategoryEntry[];
}

export const MainCategoryCardList = (props: IMainCategoryCardList) => {
  const { categories } = props;

  return (
    <div>
      {categories.map((category, index) => {
        console.log({ category }, index);
        return <div>{category.label}</div>;
      })}
    </div>
  );
};
