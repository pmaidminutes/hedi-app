import React from "react";
import { useActionBar, IActionBarProps } from "./useActionBar";
import { Button } from "carbon-components-react";
import { AudioPlayer } from "@/modules/common/components";

export const ActionBar = (props: IActionBarProps) => {
  const { hasActionBar, actions, hasAudio } = useActionBar(props);

  if (!hasActionBar) return null;
  return (
    <div className="hedi--action-bar">
      {/* {hasAudio && <AudioPlayer src={audioSrc ?? ""} />} */}
      {actions &&
        actions.map((action, index) => (
          <Button
            key={action.description + index}
            renderIcon={action.icon}
            iconDescription={action.description}
            hasIconOnly
            onClick={() => action.handler()}
          />
        ))}
    </div>
  );
};
