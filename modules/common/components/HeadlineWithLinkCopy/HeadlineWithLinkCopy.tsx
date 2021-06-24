import React from "react";
import { CopyLinkToClipboard } from "../CopyLinkToClipboard";
import { Headline, IHeadlineComponent } from "@/modules/components";
import { IEntity } from "@/modules/model";
export type HeadlineWithLinkCopy = IHeadlineComponent & Partial<IEntity>;
export const HeadlineWithLinkCopy = (props: HeadlineWithLinkCopy) => {
  const { route, id, ...rest } = props;

  return (
    <div className="hedi--headline-copy-link-to-clipboard">
      <Headline id={id} {...rest} />
      {id && (
        <CopyLinkToClipboard type="icon" size="sm" route={route} id={id} />
      )}
    </div>
  );
};
