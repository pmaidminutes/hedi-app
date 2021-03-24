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

export const Header = (props: IHeader) => {
  const { appstyle, languageSwitchLinks } = useHeader(props);
  const router = useRouter();
  const { locale } = router;

  return (
    <CarbonHeader className={`hedi--header ${appstyle}`} aria-label="header">
      <HeaderName prefix="" href={`/${locale}`}>
        <img
          src="/images/hedi_logos/hedi_logo_color_dark.svg"
          alt="HEDI Logo"
        />
      </HeaderName>
      <HeaderGlobalBar>
        <GlobalSearchMenu />
        {languageSwitchLinks !== undefined ? (
          <LanguageSwitch links={languageSwitchLinks} />
        ) : null}
        <UserProfileMenu />
      </HeaderGlobalBar>
    </CarbonHeader>
  );
};
