import { createClient, MatrixClient } from "matrix-js-sdk";
import { login } from "../../request";
import { messagingAPIBaseUrl } from "../../types";

export type SessionState = never | "logged_out" | "logging_in" | "logged_in";

export interface IMessagingService extends MatrixClient {
  sessionState: SessionState;
  currentUserId?: string;
  loginSSO: () => void;
  onSessionStateChange: (state: SessionState) => void;
}

/*
  extending Matrix Client by HEDI SSO login
  raising corresponding events
  adding a authentication state field
  should be treated as singleton TODO find a cleaner implementation

  directly extending the class would result in easier to read code
  however the 'createClient' method manipulateds the constructor parameters
  before actually calling the MatrixClient ctor
  in order not to loose those tweak, resort to overloading the object returned by 'createClient'
*/

//@ts-ignore
export const MessagingClient: IMessagingService = createClient({
  baseUrl: (process.env.APP_URL ?? "") + messagingAPIBaseUrl,
  timelineSupport: true,
});

MessagingClient.sessionState = "logged_out";
MessagingClient.loginSSO = function (this: IMessagingService) {
  if (this.sessionState === "logged_out") {
    this.sessionState = "logging_in";

    this.onSessionStateChange(this.sessionState);
    login(this).then(resp => {
      if (resp.user_id) {
        this.currentUserId = resp.user_id;
        this.startClient();
        this.sessionState = "logged_in";
        this.onSessionStateChange(this.sessionState);
      } else {
        this.currentUserId = undefined;
        this.sessionState = "logged_out";
        this.onSessionStateChange(this.sessionState);
      }
    });
  }
};

MessagingClient.on("sync", state => {
  if (state === "STOPPED" && MessagingClient.sessionState !== "logged_out") {
    MessagingClient.currentUserId = undefined;
    MessagingClient.sessionState = "logged_out";
    MessagingClient.onSessionStateChange(MessagingClient.sessionState);
  }
});

MessagingClient.on("Session.logged_out", state => {
  MessagingClient.stopClient();
  MessagingClient.currentUserId = undefined;
  MessagingClient.sessionState = "logged_out";
  MessagingClient.onSessionStateChange(MessagingClient.sessionState);
});
