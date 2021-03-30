import { AccessRule } from "./types";

export function checkAccess(userAuthenticated: boolean, rule?: AccessRule) {
  if (rule === undefined || rule === null || rule === false) return false;
  if (rule === true) return true;
  return userAuthenticated;
}
