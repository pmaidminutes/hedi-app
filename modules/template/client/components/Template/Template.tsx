import React from "react";
import { transformTemplate } from "./transformTemplate";
import { ITemplatePage } from "../../../types";
import { Body, Label } from "@/modules/components";
import { Column, Row } from "carbon-components-react";
import { FuzzyFilterDropdown } from "@/modules/common/components";


export const Template = ({ content }: { content: ITemplatePage }) => {
  const { body, hint, fuzzy } = transformTemplate(content);
  return (
    <>
      <Row>
        <Column>{body && <Body {...body} />}</Column>
        <Column>{hint && <Label {...hint} />}</Column>
      </Row>
      <Row>
        <Column>
          {fuzzy && (
            <FuzzyFilterDropdown defaultValue={fuzzy.items[0]} {...fuzzy} />
          )}
        </Column>
      </Row>
    </>
  );
};
