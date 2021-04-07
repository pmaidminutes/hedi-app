import { MatrixClient } from "matrix-js-sdk";

export async function login(msgClient: MatrixClient) {
  // TODO handle login failure gracefully
  const loginToken = await (await fetch("/api/msg/loginToken")).text();
  return msgClient.loginWithToken(loginToken);
}
