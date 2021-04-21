import { ErrorMap } from "@/modules/model";

export interface IUploadResult {
  success: boolean;
  errors: ErrorMap;
  route: string;
}
