import { IPage } from "@/modules/page/types";
import React from "react";
import { ComponentRenderer } from "@/modules/components";

export const Page = ({ content }: { content: IPage }) => {
  const { components } = content;

  return (
    <section>
      {components && <ComponentRenderer components={components} />}
    </section>
  );
};
