import React from "react";
import { Star32, StarFilled32 } from "@carbon/icons-react";
export const Stars = ({ level }: { level: number }) => {
  switch (level) {
    case 1:
      return (
        <>
          <StarFilled32 />
          <Star32 />
          <Star32 />
          <Star32 />
          <Star32 />
        </>
      );
    case 2:
      return (
        <>
          <StarFilled32 />
          <StarFilled32 />
          <Star32 />
          <Star32 />
          <Star32 />
        </>
      );

    case 3:
      return (
        <>
          <StarFilled32 />
          <StarFilled32 />
          <StarFilled32 />
          <Star32 />
          <Star32 />
        </>
      );

    case 4:
      return (
        <>
          <StarFilled32 />
          <StarFilled32 />
          <StarFilled32 />
          <StarFilled32 />
          <Star32 />
        </>
      );

    case 5:
      return (
        <>
          <StarFilled32 />
          <StarFilled32 />
          <StarFilled32 />
          <StarFilled32 />
          <StarFilled32 />
        </>
      );
    default:
      return (
        <>
          <Star32 />
          <Star32 />
          <Star32 />
          <Star32 />
          <Star32 />
        </>
      );
  }
};
