// BUG needs to be imported directly to avoid nextjs clientside code-elimination error
// don't re-export nextauth, thus commented out line stays here as reminder
// export { nextauthAPI } from "./nextauthAPI";
export * from "./functions";
export * from "./oauth";
export * from "./serviceSession";
