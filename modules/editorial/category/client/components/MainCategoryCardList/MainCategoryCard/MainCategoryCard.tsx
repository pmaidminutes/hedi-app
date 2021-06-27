import React from "react";
import {
  IMainCategoryCard,
  transformMainCategoryCard,
} from "./transformMainCategoryCard";
import { Column, Row } from "carbon-components-react";
import { Image } from "@/modules/components";
import Link from "next/link";

export const MainCategoryCard = (props: IMainCategoryCard) => {
  const {
    rowIsEven,
    firstColumnProps,
    secondColumnProps,
    label,
    image,
    appStyle,
    route,
  } = transformMainCategoryCard(props);
  return (
    <div className={`hedi--main-category__card`}>
      <Link href={route}>
        <Row condensed>
          <Column
            {...firstColumnProps}
            className={
              rowIsEven ? "" : "hedi--main-category__card--image-wrap"
            }>
            {rowIsEven ? (
              <div className={`hedi--main-category__card--text ${appStyle}`}>
                <p>{label}</p>
              </div>
            ) : (
              image && (
                <Image
                  layout="fill"
                  objectFit="cover"
                  objectPosition="top left"
                  {...image}
                />
              )
            )}
          </Column>
          <Column
            {...secondColumnProps}
            className={
              rowIsEven ? "hedi--main-category__card--image-wrap" : ""
            }>
            {rowIsEven ? (
              image && (
                <Image
                  layout="fill"
                  objectFit="cover"
                  objectPosition="top left"
                  {...image}
                />
              )
            ) : (
              <div className={`hedi--main-category__card--text ${appStyle}`}>
                <p>{label}</p>
              </div>
            )}
          </Column>
        </Row>
      </Link>
    </div>
  );
};
