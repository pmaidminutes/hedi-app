import { DependencyList, useEffect } from "react";
import { MatrixClient } from "../types";

// MatrixClient doesn't handle lifecycle of listeners
// we have to attach and cleanup ourself in order to not run into a memory leak
// reacts useEffect serves as ctor and destructor
export function useListener(
  client: MatrixClient,
  eventName: string,
  listener: (...args: any[]) => void,
  deps?: DependencyList
) {
  useEffect(() => {
    const local = listener;
    if (client.listeners(eventName).find(local))
      client.removeListener(eventName, local);
    client.addListener(eventName, local);

    return () => {
      client.removeListener(eventName, local);
    };
  }, deps);
}
