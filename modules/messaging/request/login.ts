import { IMatrixClient } from "../types";

export async function login(msgClient: IMatrixClient) {
  const loginToken = await (await fetch("/api/msg/loginToken")).text();
  return msgClient.loginWithToken(loginToken);
}
