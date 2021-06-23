import React from "react";
import { useActionBar, IActionBarProps } from "./useActionBar";
import { Button } from "carbon-components-react";
import { AudioPlayer, Seperator } from "@/modules/common/components";
import {
  VolumeUp16,
  Share16,
  Bookmark16,
  Printer16,
  Language16,
} from "@carbon/icons-react";

export const ActionBar = (props: IActionBarProps) => {
  const { hasActionBar, actions, hasAudio } = useActionBar(props);

  if (!hasActionBar) return null;
  return (
    <div className="hedi--action-bar">
      <div className="hedi--action-bar__items">
        <div className="hedi--action-bar__item">
          <VolumeUp16 />
          Artikel anhören
        </div>
        <div className="hedi--action-bar__item">
          <Share16 />
          Teilen
        </div>
        <div className="hedi--action-bar__item">
          <Bookmark16 />
          Lesezeichen
        </div>
        <div className="hedi--action-bar__item">
          <Printer16 />
          Drucken
        </div>
        <div className="hedi--action-bar__item">
          <Language16 />
          Sprachen ändern
        </div>
      </div>
      {/* {hasAudio && <AudioPlayer src={audioSrc ?? ""} />} */}
      {/* {actions &&
        actions.map((action, index) => (
          <Button
            key={action.description + index}
            renderIcon={action.icon}
            iconDescription={action.description}
            hasIconOnly
            onClick={() => action.handler()}
          />
        ))} */}
      <Seperator style="dashed" color="blue" />
    </div>
  );
};
