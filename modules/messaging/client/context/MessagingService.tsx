import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import {
  SessionState,
  IMessagingService,
  MessagingClient,
} from "./MessagingClient";

const MessagingServiceContext = createContext(MessagingClient);
MessagingServiceContext.displayName = "MessagingService";

const useSessionState = (client: IMessagingService) => {
  const [sessionState, setSessionState] = useState<SessionState>(
    client.sessionState
  );
  useEffect(() => {
    client.onSessionStateChange = setSessionState;
  }, [client]);
  return sessionState;
};

export const MessagingServiceProvider = ({
  children,
}: {
  children?: ReactNode;
}) => {
  const [client] = useState(MessagingClient);
  const sessionState = useSessionState(client);
  return (
    <MessagingServiceContext.Provider value={client} key={sessionState}>
      {children}
    </MessagingServiceContext.Provider>
  );
};

export const useMessagingService = () => useContext(MessagingServiceContext);
