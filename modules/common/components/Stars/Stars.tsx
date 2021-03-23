import React from "react";
import { Star32, StarFilled32 } from "@carbon/icons-react";
const MAX_STARS = 5;
export const Stars = ({ level }: { level: number }) => {
  return (
    <>
      {[...Array(level)].map(x => (
        <StarFilled32 />
      ))}
      {[...Array(MAX_STARS - level)].map(x => (
        <Star32 />
      ))}
    </>
  );
};
