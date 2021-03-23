import { useRouter } from "next/router";
import {
  IAppStyled,
  IEntityLocalized,
  IEntityTranslated,
} from "@/modules/model";
import { LanguageSwitch } from "../LanguageSwitch";
import {
  Header as CarbonHeader,
  HeaderName,
  HeaderGlobalBar,
} from "carbon-components-react";

import { GlobalSearchMenu } from "../GlobalSearchMenu";
import { UserProfileMenu } from "../UserProfileMenu";

type HeaderProps = Pick<
  IEntityTranslated<IEntityLocalized>,
  "label" | "translations"
> &
  Partial<IAppStyled>;

export const Header: React.FunctionComponent<HeaderProps> = ({
  label,
  translations,
  appstyle = "hedi-category-color--default",
}) => {
  const router = useRouter();
  const { locale } = router;

  return (
    <CarbonHeader className={`hedi-header ${appstyle}`} aria-label="header">
      <HeaderName prefix="" href={`/${locale}`}>
        ♥ Hedi
      </HeaderName>
      <HeaderGlobalBar>
        <GlobalSearchMenu />
        {/* {translations !== undefined ? (
          <LanguageSwitch translations={translations} />
        ) : null} */}
        <UserProfileMenu />
      </HeaderGlobalBar>
    </CarbonHeader>
  );
};
