import React from "react";
import { ICategory, ICategoryEntry } from "../../../types";
import { MainCategoryCard } from "./MainCategoryCard";

export interface IMainCategoryCardList {
  categories: ICategoryEntry[];
}

export const MainCategoryCardList = (props: IMainCategoryCardList) => {
  const { categories } = props;

  return (
    <div className="hedi--main-category__list">
      {categories.map((category, index) => {
        return (
          <MainCategoryCard
            key={category.label + index}
            index={index}
            category={category as ICategory}
          />
        );
      })}
    </div>
  );
};
