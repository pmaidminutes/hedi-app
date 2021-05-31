import { IEntityLocalized, IEntityTranslated } from "@/modules/model";
import { IAddress, IEmail, IPhone, IWebsite } from "./dataTypes";
import { IBusinessProfile } from "./IBusinessProfile";

export interface IProfileEntry
  extends IEntityTranslated<IEntityLocalized>,
    Partial<Pick<IBusinessProfile, "profession" | "services">> {
  //image: Image
  address?: IAddress;
  phone?: IPhone;
  email?: IEmail;
  website?: IWebsite;
}
