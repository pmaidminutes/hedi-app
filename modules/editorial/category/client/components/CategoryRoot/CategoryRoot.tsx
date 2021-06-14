import React from "react";
import { ICategoryEntry } from "../../../types";
import { ICategoryProps } from "../Category/transformCategory";
import { CategoryEntry } from "../CategoryEntry";
import { transformCategoryRoot } from "./transformCategoryRoot";
export const CategoryRoot = (props: ICategoryProps) => {
  const { categories } = transformCategoryRoot(props);
  return (
    <section>
      {categories.map((category, index) => (
        <CategoryEntry
          key={category.label + index}
          category={category as ICategoryEntry}
        />
      ))}
    </section>
  );
};
