import { useState, useEffect, ReactChild } from "react";
import { IArticleAction } from "../../../types";

export interface IActionBarProps {
  actions?: IArticleAction[];
  children?: ReactChild;
}

export function useActionBar(props: IActionBarProps) {
  const { actions, children } = props;
  const [hasActionBar, setHasActionBar] = useState(!!actions);

  useEffect(() => {
    setHasActionBar(!!actions);
  }, [actions]);

  return {
    hasActionBar,
    actions: actions === undefined ? null : actions,
    children,
  };
}
