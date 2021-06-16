import { useSideNav } from "../../hooks";
import { transformHeader, IHeader } from "./transformHeader";
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
  TooltipIcon,
} from "carbon-components-react";

// import { GlobalSearchMenu } from "../GlobalSearchMenu";
import { UserProfileMenu } from "../UserProfileMenu";
import Logo from "./assets/hedi_logo_single_new.svg";
import { isLink } from "@/modules/components/types";

export const Header = (props: IHeader) => {
  const {
    appstyle,
    languageSwitchLinks,
    headerLinks,
    userMenuLinks,
    shellConfig,
    locale,
    backToHome,
  } = transformHeader(props);

  const { isExpanded, toggleSideNav } = useSideNav();

  return (
    <CarbonHeader className={`hedi--header ${appstyle}`} aria-label="header">
      <HeaderName prefix="" href={`/${locale}`}>
        <TooltipIcon tooltipText={backToHome}>
          {/* TODO SVG */}
          {/* <Logo /> */}
        </TooltipIcon>
      </HeaderName>
      <HeaderNavigation aria-label="Navigation" style={{ display: "block" }}>
        <HeaderMenuButton
          aria-label="Open menu"
          onClick={toggleSideNav}
          isActive={isExpanded}
        />
        {headerLinks &&
          headerLinks.map((link: any, index: number) => {
            if (isLink(link)) {
              return (
                <HeaderMenuItem
                  key={link.labelText + index}
                  href={link.href}
                  title={link.labelText}>
                  {link.labelText}
                </HeaderMenuItem>
              );
            }
          })}
      </HeaderNavigation>
      <HeaderGlobalBar>
        {/* <GlobalSearchMenu /> */}
        {languageSwitchLinks !== undefined ? (
          <LanguageSwitch links={languageSwitchLinks} config={shellConfig} />
        ) : null}

        {userMenuLinks && (
          <UserProfileMenu userMenuLinks={userMenuLinks} config={shellConfig} />
        )}
      </HeaderGlobalBar>
      <SideNav
        aria-label="Side navigation"
        expanded={isExpanded}
        isPersistent={false}>
        <SideNavItems>
          <HeaderSideNavItems>
            {headerLinks &&
              headerLinks.map((link, index) => {
                if (isLink(link)) {
                  return (
                    <HeaderMenuItem
                      key={link.labelText + index}
                      href={link.href}
                      title={link.labelText}>
                      {link.labelText}
                    </HeaderMenuItem>
                  );
                }
              })}
          </HeaderSideNavItems>
        </SideNavItems>
      </SideNav>
    </CarbonHeader>
  );
};
