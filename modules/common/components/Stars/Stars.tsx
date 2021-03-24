import React from "react";
import { Star16, StarFilled16 } from "@carbon/icons-react";
const MAX_STARS = 10;
export const Stars = ({ level }: { level: number }) => {
  return (
    <>
      {[...Array(level)].map(x => (
        <StarFilled16 />
      ))}
      {[...Array(MAX_STARS - level)].map(x => (
        <Star16 />
      ))}
    </>
  );
};
1;
