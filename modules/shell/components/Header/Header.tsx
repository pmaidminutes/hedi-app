import { useRouter } from "next/router";
import { useState } from "react";
import { useHeader, IHeader } from "./useHeader";
import { LanguageSwitch } from "../LanguageSwitch";
import {
  Header as CarbonHeader,
  HeaderName,
  HeaderGlobalBar,
  HeaderNavigation,
  HeaderMenuItem,
  HeaderMenuButton,
  SideNav,
  SideNavItems,
  HeaderSideNavItems,
} from "carbon-components-react";

// import { GlobalSearchMenu } from "../GlobalSearchMenu";
import { UserProfileMenu } from "../UserProfileMenu";
import Logo from "./assets/hedi_logo_single_new.svg";

export const Header = (props: IHeader) => {
  const {
    appstyle,
    languageSwitchLinks,
    headerLinks,
    userMenuLinks,
    shellConfig,
  } = useHeader(props);
  const [isSideNavExpanded, setIsSideNavExpanded] = useState(false);
  const router = useRouter();
  const { locale } = router;

  const onClickSideNavExpand = () => {
    setIsSideNavExpanded(prev => !prev);
  };

  return (
    <CarbonHeader className={`hedi--header ${appstyle}`} aria-label="header">
      <HeaderName prefix="" href={`/${locale}`}>
        <Logo />
      </HeaderName>
      <HeaderNavigation aria-label="Navigation" style={{ display: "block" }}>
        <HeaderMenuButton
          aria-label="Open menu"
          onClick={onClickSideNavExpand}
          isActive={isSideNavExpanded}
        />
        {headerLinks
          ? headerLinks.map((link, index) => {
              return (
                <HeaderMenuItem
                  key={link.label + index}
                  href={link.route}
                  title={link.longTitle ?? link.label}>
                  {link.longTitle ?? link.label}
                </HeaderMenuItem>
              );
            })
          : null}
      </HeaderNavigation>
      <HeaderGlobalBar>
        {/* <GlobalSearchMenu /> */}
        {languageSwitchLinks !== undefined ? (
          <LanguageSwitch links={languageSwitchLinks} config={shellConfig} />
        ) : null}
        <UserProfileMenu userMenuLinks={userMenuLinks} config={shellConfig} />
      </HeaderGlobalBar>
      <SideNav
        aria-label="Side navigation"
        expanded={isSideNavExpanded}
        isPersistent={false}>
        <SideNavItems>
          <HeaderSideNavItems>
            {headerLinks
              ? headerLinks.map((link, index) => {
                  return (
                    <HeaderMenuItem
                      key={link.label + index}
                      href={link.route}
                      title={link.longTitle ?? link.label}>
                      {link.longTitle ?? link.label}
                    </HeaderMenuItem>
                  );
                })
              : null}
          </HeaderSideNavItems>
        </SideNavItems>
      </SideNav>
    </CarbonHeader>
  );
};
