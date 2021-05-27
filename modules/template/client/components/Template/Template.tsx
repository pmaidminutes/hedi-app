import React from "react";
import { transformTemplate } from "./transformTemplate";
import { ITemplatePage } from "../../../types";
import { Body, Label } from "@/modules/common/components";
import { Column, Row } from "carbon-components-react";

export const Template = ({ content }: { content: ITemplatePage }) => {
  const { body, hint } = transformTemplate(content);

  return (
    <>
      <Row>
        <Column>{body && <Body {...body} />}</Column>
        <Column>{hint && <Label {...hint} />}</Column>
      </Row>
    </>
  );
};
