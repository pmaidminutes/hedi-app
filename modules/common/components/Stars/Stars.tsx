import React from "react";
import {
  Star16,
  StarFilled16,
  PhraseSentiment24,
  PhraseSentiment32,
} from "@carbon/icons-react";
const MAX_STARS = 6;
export const Stars = ({ level }: { level: number }) => {
  if (level > MAX_STARS) level = MAX_STARS;
  if (level < 0) level = 0;
  return (
    <>
      {[...Array(level)].map((x, index) => (
        <PhraseSentiment24 key={"star-" + index} />
      ))}
      {/* {[...Array(level)].map((x, index) => (
        <StarFilled16 key={"star-" + index} />
      ))} */}
      {[...Array(MAX_STARS - level)].map((x, index) => (
        <PhraseSentiment24
          className="inactive"
          key={"star-" + (level + index)}
        />
      ))}
      {/* {[...Array(MAX_STARS - level)].map((x, index) => (
        <Star16 key={"star-" + (level + index)} />
      ))} */}
    </>
  );
};
