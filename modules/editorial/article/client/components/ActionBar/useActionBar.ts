import { useState, useEffect, ReactChild } from "react";
import { IActionBarAction } from "@/modules/editorial/types";

export interface IActionBarProps {
  actions?: IActionBarAction[];
  children?: ReactChild;
}

export function useActionBar(props: IActionBarProps) {
  const { actions, children } = props;
  const [hasActionBar, setHasActionBar] = useState(
    actions && actions.length > 0
  );

  useEffect(() => {
    setHasActionBar(actions && actions.length > 0);
  }, [actions]);

  return {
    hasActionBar,
    actions: actions === undefined ? null : actions,
    children,
  };
}
