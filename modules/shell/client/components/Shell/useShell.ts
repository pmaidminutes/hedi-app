import { IShellProps } from "@/modules/shell/types";
import { useEffect, useState } from "react";
import { getUser } from "@/modules/auth/client";
import { checkAccess } from "../../../utils";
import { usePageAccess } from "./usePageAccess";

export function useShell(shell: Partial<IShellProps>) {
  const { useHeader, appstyle, redirectUnAuthorized } = shell;

  const [hasHeader, setHasHeader] = useState(useHeader === true);
  const [hediStyle, setHediStyle] = useState("");
  const [user, isLoading] = getUser();

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
  };
}
