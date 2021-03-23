import React, { ReactNode } from "react";
import { Row } from "carbon-components-react";
interface IRowWithBg {
  children: ReactNode;
  imageSrc?: string;
}
export const RowWithBg = (props: IRowWithBg) => {
  const { children } = props;
  return (
    <Row className="hedi__row-with-bg">
      <div>{children}</div>
    </Row>
  );
};
