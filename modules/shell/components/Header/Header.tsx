import { useRouter } from "next/router";
import { useHeader, IHeader } from "./useHeader";
import { LanguageSwitch } from "../LanguageSwitch";
import {
  Header as CarbonHeader,
  HeaderName,
  HeaderGlobalBar,
} from "carbon-components-react";

import { GlobalSearchMenu } from "../GlobalSearchMenu";
import { UserProfileMenu } from "../UserProfileMenu";
import Logo from "./assets/hedi_logo_single_new.svg";

export const Header = (props: IHeader) => {
  const { header, appstyle, languageSwitchLinks } = useHeader(props);
  const router = useRouter();
  const { locale } = router;

  return (
    <CarbonHeader className={`hedi--header ${appstyle}`} aria-label="header">
      <HeaderName prefix="" href={`/${locale}`}>
        <Logo />
      </HeaderName>
      <HeaderGlobalBar>
        <GlobalSearchMenu />
        {languageSwitchLinks !== undefined ? (
          <LanguageSwitch links={languageSwitchLinks} />
        ) : null}
        <UserProfileMenu headerLinks={header} />
      </HeaderGlobalBar>
    </CarbonHeader>
  );
};
