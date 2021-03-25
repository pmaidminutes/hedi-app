import React from "react";
import { Star16, StarFilled16 } from "@carbon/icons-react";
const MAX_STARS = 10;
export const Stars = ({ level }: { level: number }) => {
  return (
    <>
      {[...Array(level)].map((x, index) => (
        <StarFilled16 key={"star-" + index} />
      ))}
      {[...Array(MAX_STARS - level)].map((x, index) => (
        <Star16 key={"star-" + (level + index)} />
      ))}
    </>
  );
};
