import React, { ReactNode } from "react";
interface IFullWidthBg {
  children?: ReactNode;
}
export const FullWidthBg = ({ children }: IFullWidthBg) => {
  return (
    <div className="hedi--full-width-bgimage">{children ? children : null}</div>
  );
};
