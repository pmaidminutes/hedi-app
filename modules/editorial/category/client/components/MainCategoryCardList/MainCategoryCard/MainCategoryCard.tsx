import React from "react";
import {
  IMainCategoryCard,
  transformMainCategoryCard,
} from "./transformMainCategoryCard";
import { Column, Row } from "carbon-components-react";
import { Image, Link } from "@/modules/components";

export const MainCategoryCard = (props: IMainCategoryCard) => {
  const {
    rowIsEven,
    firstColumnProps,
    secondColumnProps,
    label,
    image,
  } = transformMainCategoryCard(props);
  return (
    <div>
      <Row>
        <Column {...firstColumnProps}>
          {rowIsEven ? (
            <div className="hedi--main-category__card">
              <span>{label}</span>
            </div>
          ) : (
            image && <Image {...image} />
          )}
        </Column>
        <Column {...secondColumnProps}>
          {rowIsEven ? (
            image && <Image {...image} />
          ) : (
            <div className="hedi--main-category__card">
              <span>{label}</span>
            </div>
          )}
        </Column>
      </Row>
    </div>
  );
};
