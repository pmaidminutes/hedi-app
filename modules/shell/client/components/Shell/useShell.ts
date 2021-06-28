import { IShellProps } from "@/modules/shell/types";

import { useEffect, useState } from "react";
import { getUser } from "@/modules/auth/client";
import { checkAccess } from "../../../utils";
import { usePageAccess } from "./usePageAccess";

export function useShell(shell: Partial<IShellProps>) {
  const {
    useHeader,
    appStyle,
    redirectUnAuthorized,
    layout,
    langDirections,
  } = shell;

  const [hasHeader, setHasHeader] = useState(useHeader === true);
  const [hediStyle, setHediStyle] = useState("");
  const [user, isLoading] = getUser();
  const pageLayout = layout?.pageLayout ?? null;
  const layoutHeadline = layout?.headline || null;

  useEffect(() => {
    setHasHeader(checkAccess(!!user, useHeader));
  }, [useHeader, user?.name, isLoading]);

  useEffect(() => {
    // HACK use later on
    setHediStyle(appStyle ?? "hedi-category-color--default");
  }, [appStyle]);

  const { hasPageAccess } = usePageAccess(redirectUnAuthorized);

  return {
    hasPageAccess,
    hediStyle,
    hasHeader,
    pageLayout,
    layout,
    langDirections,
    layoutHeadline,
  };
}
