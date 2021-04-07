import { MatrixClient } from "matrix-js-sdk";
import { loginTokenAPIUrl } from "../../types";

export async function login(msgClient: MatrixClient) {
  // TODO handle login failure gracefully
  const loginToken = await (await fetch(loginTokenAPIUrl)).text();
  return msgClient.loginWithToken(loginToken);
}
