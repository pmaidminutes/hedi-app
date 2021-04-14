import { useEffect, useState } from "react";
import { extractConfig, IEditProfileView } from "@/modules/editProfile/types";

export function useConfig(content: IEditProfileView) {
  const [config, setConfig] = useState(extractConfig(content));
  useEffect(() => {
    setConfig(extractConfig(content));
  }, [content.lang]);
  return config;
}
