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
    <div className={`${appStyle} hedi--main-category__card`}>
      <Link href={route}>
        <Row>
          <Column {...firstColumnProps}>
            {rowIsEven ? (
              <div className="hedi--main-category__card--text">
                <p>{label}</p>
              </div>
            ) : (
              image && <Image {...image} />
            )}
          </Column>
          <Column {...secondColumnProps}>
            {rowIsEven ? (
              image && <Image {...image} />
            ) : (
              <div className="hedi--main-category__card--text">
                <p>{label}</p>
              </div>
            )}
          </Column>
        </Row>
      </Link>
    </div>
  );
};
