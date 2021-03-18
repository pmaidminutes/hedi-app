import { IAppPage } from "@/modules/common/types";
import { IEntityLocalized, IEntityTranslated } from "@/modules/model";
import { IProfile } from "@/modules/model/IProfile";

export interface IViewProfile extends IEntityTranslated<IEntityLocalized> {
  AppPage: IAppPage;
  Profile: IProfile;
}
