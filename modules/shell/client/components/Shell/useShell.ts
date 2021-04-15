import { IShellProps } from "@/modules/shell/types";
import { useEffect, useState } from "react";
import { getUser } from "@/modules/auth/client";
import { checkAccess } from "../../../utils";
import { usePageAccess } from "./usePageAccess";

export function useShell(shell: Partial<IShellProps>) {
  const { useHeader, appstyle, redirectUnAuthorized, layout } = shell;

  const [hasHeader, setHasHeader] = useState(useHeader === true);
  const [hediStyle, setHediStyle] = useState("");
  const [user, isLoading] = getUser();
  const pageLayout = layout?.pageLayout ?? null;

  useEffect(() => {
    setHasHeader(checkAccess(!!user, useHeader));
  }, [useHeader, user?.name, isLoading]);

  useEffect(() => {
    setHediStyle(appstyle ?? "");
  }, [appstyle]);

  const { hasPageAccess } = usePageAccess(redirectUnAuthorized);

  return {
    hasPageAccess,
    hediStyle,
    hasHeader,
    pageLayout,
    layout,
  };
}
