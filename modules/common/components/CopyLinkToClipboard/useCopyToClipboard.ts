import { useState, useEffect } from "react";

export function useCopyToClipboard(text: string) {
  const [copyText, setCopyText] = useState(text);

  useEffect(() => {
    setCopyText(text);
  }, [text]);

  const addToClipboard = async () => {
    await navigator.clipboard.writeText(copyText);
    alert("Text copied");
  };

  return { addToClipboard };
}
