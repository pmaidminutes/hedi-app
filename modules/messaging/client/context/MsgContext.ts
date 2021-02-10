import {
  createContext,
  useContext,
  createElement,
  ReactNode,
  useState,
  useEffect,
} from "react";
import { defaultMatrixClient } from "../../types";

const msgContext = createContext(defaultMatrixClient);
msgContext.displayName = "MsgContext";

export const MsgClientProvider = ({ children }: { children?: ReactNode }) => {
  const [client] = useState(defaultMatrixClient); //needed??
  useEffect(() => {
    // componentWillUnmount
    return () => {
      if (client.clientRunning) {
        client.logout();
        client.stopClient();
      }
    };
  });
  return createElement(msgContext.Provider, { value: client }, children);
};

export const useMsgClient = () => useContext(msgContext);
