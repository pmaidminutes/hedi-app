import React from "react";
import { PhraseSentiment32 } from "@carbon/icons-react";
const MAX_STARS = 4;
export const Rating = ({ level }: { level: number }) => {
  if (level > MAX_STARS) level = MAX_STARS;
  if (level < 0) level = 0;
  return (
    <>
      {[...Array(level)].map((x, index) => (
        <PhraseSentiment32 key={"star-" + index} />
      ))}
      {[...Array(MAX_STARS - level)].map((x, index) => (
        <PhraseSentiment32
          className="inactive"
          key={"star-" + (level + index)}
        />
      ))}
    </>
  );
};
