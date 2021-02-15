import * as sdk from "matrix-js-sdk";
import { LoginPayload, MatrixClient } from "./index";
import { login } from "../request";

// MatrixClient ts definition doesn't include all available properties
// extending the used ones here
export interface IMatrixClient extends MatrixClient {
  loginSSO: () => Promise<LoginPayload>;
  clientRunning: boolean;
  onRunningChange?: (isRunning: boolean) => void;
}

export const defaultMatrixClient: IMatrixClient = sdk.createClient({
  baseUrl: (process.env.APP_URL ?? "") + "/api/msg",
});
defaultMatrixClient.loginSSO = async function () {
  const loginResponse = await login(this);
  if (loginResponse.user_id) {
    this.startClient();
    if (this.onRunningChange) this.onRunningChange(true);
    this.addListener("sync", state => {
      if (this.onRunningChange && state === "STOPPED")
        this.onRunningChange(false);
    });
  }

  return loginResponse;
};
