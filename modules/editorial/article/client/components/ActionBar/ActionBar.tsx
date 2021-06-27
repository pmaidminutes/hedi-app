import React from "react";
import { useActionBar, IActionBarProps } from "./useActionBar";
import { Seperator } from "@/modules/common/components";
import { ActionBarItem } from "./ActionBarItem";

export const ActionBar = (props: IActionBarProps) => {
  const { hasActionBar, actions, children } = useActionBar(props);

  if (!hasActionBar) return null;
  return (
    <div className="hedi--action-bar">
      <div className="hedi--action-bar__items">
        {actions?.map((action, index) => (
          <ActionBarItem key={action.description + index} action={action} />
        ))}
        {children && children}
      </div>
      <Seperator style="dashed" color="gray" />
    </div>
  );
};
