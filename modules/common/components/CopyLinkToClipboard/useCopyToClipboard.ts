import { useState, useEffect } from "react";
// timeout in ms
const timeout: number = 3000;

export function useCopyToClipboard(text: string) {
  const [copyText, setCopyText] = useState(text);
  const [hasNotification, setHasNotification] = useState(false);

  useEffect(() => {
    setCopyText(text);
  }, [text]);

  const addToClipboard = async () => {
    await navigator.clipboard.writeText(copyText);
    setHasNotification(true);
    setTimeout(resetNotification, timeout);
    // alert("Text copied");
  };

  const resetNotification = () => {
    setHasNotification(false);
  };

  // TODO get Text from cms
  const notificationData = {
    timeout,
    title: "Link wurde ins Clipboard kopiert",
  };

  return { addToClipboard, hasNotification, notificationData };
}
