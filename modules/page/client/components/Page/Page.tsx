import { IPage } from "@/modules/page/types";
import React from "react";
import { Renderer } from "@/modules/common/components";

export const Page = ({ content }: { content: IPage }) => {
  const { id } = content;
  const { components } = content;

  return (
    <section>{components && <Renderer components={components} />}</section>
  );
};
