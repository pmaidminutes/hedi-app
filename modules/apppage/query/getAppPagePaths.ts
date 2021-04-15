import { generateAppPagePathsGQL } from "@/modules/common/query";

// Array with all static rendered pages
export const AppPagePathsGQL = generateAppPagePathsGQL(["imprint", "privacy","profiles", "login","registration", "editprofile", "viewprofile", "userfeedback","userfeedbackThanks","search"]);
