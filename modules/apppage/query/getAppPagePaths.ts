import { generateAppPagePathsGQL } from "@/modules/common/query";

// Array with all static rendered pages
export const AppPagePathsGQL = generateAppPagePathsGQL([
  "imprint",
  "privacy",
  "login",
  "registration",
  "userfeedback",
  "userfeedbackThanks",
  "search",
]);
