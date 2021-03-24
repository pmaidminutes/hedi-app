import React, { ReactNode } from "react";
import { Row } from "carbon-components-react";
interface IRowWithBg {
  children: ReactNode;
  imageSrc?: string;
}
export const BgImgContainer = (props: IRowWithBg) => {
  const { children } = props;
  return (
    <div className="hedi--bg-img-container">
      <div>{children}</div>
    </div>
  );
};
