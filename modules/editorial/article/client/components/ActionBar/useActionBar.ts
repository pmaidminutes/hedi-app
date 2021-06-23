import { useState, useEffect } from "react";
import { IArticleAction } from "../../../types";

export interface IActionBarProps {
  actions?: IArticleAction[];
}

export function useActionBar(props: IActionBarProps) {
  const { actions } = props;
  const [hasActionBar, setHasActionBar] = useState(!!actions);

  useEffect(() => {
    setHasActionBar(!!actions);
  }, [actions]);

  return {
    hasActionBar,
    actions: actions === undefined ? null : actions,
  };
}
